declare module 'apify-client' {
    export class ApifyClient {
      constructor(options: { token: string });
      actor(actorId: string): {
        call: (input: any) => Promise<any>;
      };
      dataset(datasetId: string): {
        listItems: () => Promise<{ items: any[] }>;
      };
    }
  }