// Shared Vite configuration for all vitest config files.

/** @returns {import('vite').Plugin} Vite plugin that treats warnings as errors. */
export function failOnViteWarnings() {
  return {
    name: 'fail-on-vite-warnings',
    configResolved(config) {
      const warn = config.logger.warn.bind(config.logger);
      const warnOnce = config.logger.warnOnce.bind(config.logger);

      // Override warn to throw after printing the original message.
      config.logger.warn = (msg, options) => {
        warn(msg, options);
        throw new Error(`Vite warning treated as error: ${msg}`);
      };

      // Override warnOnce as well since it bypasses warn() internally.
      config.logger.warnOnce = (msg, options) => {
        warnOnce(msg, options);
        throw new Error(`Vite warning treated as error: ${msg}`);
      };
    },
  };
}
