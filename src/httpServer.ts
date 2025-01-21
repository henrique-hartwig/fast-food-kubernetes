import express from 'express';


export interface IHttpServer {
  getApp(): express.Application;
	listen (port: number): Promise<void>;
}

export class HttpServer implements IHttpServer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  getApp(): express.Application {
    return this.app;
  }

  async listen(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve();
      });
    });
  }
}
