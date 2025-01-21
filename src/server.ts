import express from 'express';
import { routes } from './routes';


export interface IHttpServer {
	listen (port: number): void;
}

export class HttpServer implements IHttpServer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', routes);
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
