/**
 * Vitest globalSetup that starts a local HTTPS/HTTP2 server for transport
 * tests. Uses a self-signed certificate so that streaming request bodies
 * (ReadableStream) work in Chromium, which requires HTTP/2. The browser
 * config passes --ignore-certificate-errors to Chromium to accept the
 * self-signed cert. The server URL is provided to tests via
 * inject('baseUrl').
 */

import {execSync} from 'node:child_process';
import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import type {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse,
} from 'node:http2';
import {createSecureServer} from 'node:http2';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import type {GlobalSetupContext} from 'vitest/node';

/** Collects the full request body into a Uint8Array. */
async function collectBody(req: Http2ServerRequest): Promise<Uint8Array> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

/** Adds CORS headers so browser-based tests can reach the server. */
function setCors(res: Http2ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
}

/** Generates a self-signed certificate in a temp directory. */
function generateCert(): {key: Buffer; cert: Buffer; tmpDir: string} {
  const tmpDir = mkdtempSync(join(tmpdir(), 'test-server-'));
  const keyPath = join(tmpDir, 'key.pem');
  const certPath = join(tmpDir, 'cert.pem');
  execSync(
    `openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:prime256v1 ` +
      `-keyout ${keyPath} -out ${certPath} -days 1 -nodes ` +
      `-subj "/CN=localhost" -addext "subjectAltName=IP:127.0.0.1" 2>/dev/null`
  );
  return {
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
    tmpDir,
  };
}

let server: Http2SecureServer | undefined;
let certTmpDir: string | undefined;

export async function setup({provide}: GlobalSetupContext): Promise<void> {
  // Allow Node.js fetch to connect to the self-signed certificate.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const {key, cert, tmpDir} = generateCert();
  certTmpDir = tmpDir;

  const srv = createSecureServer(
    {key, cert, allowHTTP1: true},
    (req: Http2ServerRequest, res: Http2ServerResponse) => {
      setCors(res);

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      void handleRoute(req.url, req, res);
    }
  );
  server = srv;

  await new Promise<void>(resolve => {
    srv.listen(0, '127.0.0.1', () => {
      resolve();
    });
  });

  const addr = srv.address();
  if (addr === null || typeof addr === 'string') {
    throw new Error('Failed to get server address.');
  }
  const baseUrl = `https://127.0.0.1:${String(addr.port)}`;
  provide('baseUrl', baseUrl);
}

export async function teardown(): Promise<void> {
  const srv = server;
  if (srv !== undefined) {
    await new Promise<void>((resolve, reject) => {
      srv.close(err => {
        if (err !== undefined) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  if (certTmpDir !== undefined) {
    rmSync(certTmpDir, {recursive: true, force: true});
  }
}

/**
 * Routes requests to the appropriate handler. Each path corresponds to a
 * test case.
 */
async function handleRoute(
  url: string,
  req: Http2ServerRequest,
  res: Http2ServerResponse
): Promise<void> {
  switch (url) {
    case '/json': {
      const body = await collectBody(req);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          receivedMethod: req.method,
          receivedContentType: req.headers['content-type'],
          receivedBody: Buffer.from(body).toString(),
        })
      );
      return;
    }

    case '/bytes': {
      const body = await collectBody(req);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          length: body.length,
          bytes: Array.from(body),
        })
      );
      return;
    }

    case '/stream-upload': {
      const body = await collectBody(req);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(Buffer.from(body).toString());
      return;
    }

    case '/stream-large': {
      const body = await collectBody(req);
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(body.length),
      });
      res.end(body);
      return;
    }

    case '/stream-download': {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'X-Custom': 'test-value',
      });
      res.write('chunk1');
      res.write('chunk2');
      res.write('chunk3');
      res.end();
      return;
    }

    case '/no-body': {
      const body = await collectBody(req);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          method: req.method,
          bodyLength: body.length,
        })
      );
      return;
    }

    case '/headers': {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(
        JSON.stringify({
          accept: req.headers.accept,
          custom: req.headers['x-custom-header'],
        })
      );
      return;
    }

    case '/error': {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end('{"error":"internal"}');
      return;
    }

    case '/slow': {
      setTimeout(() => {
        res.writeHead(200);
        res.end('too late');
      }, 5000);
      return;
    }

    default: {
      res.writeHead(404);
      res.end('not found');
    }
  }
}
