import { Client } from '@databricks/sdk-databricks/tasks/v1';
import { Operation } from '@databricks/sdk-databricks/tasks/lro';

export class CreatePipelineOperation {
    private readonly client: Client;
    private operation: Operation;
  
    constructor(client: Client, operation: Operation) {
      this.client = client;
      this.operation = operation;
    }
  
    /**
     * Returns the name of the long-running operation. The name is assigned by the
     * server and is unique within the service from which the operation is created.
     */
    name(): string {
      return this.operation.name;
    }
  
    /**
     * Returns metadata associated with the long-running operation. If the metadata
     * is not available, returns undefined.
     */
    metadata(): PipelineMetadata | undefined {
      if (!this.operation.metadata) {
        return undefined;
      }
      return this.operation.metadata as PipelineMetadata;
    }
}
