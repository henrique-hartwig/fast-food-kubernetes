import { HttpServer } from './server';

const PORT = process.env.PORT || 3000;
const server = new HttpServer();
server.listen(Number(PORT));

console.log('Application initialized');
