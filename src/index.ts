import { HttpServer } from './httpServer';
import DatabaseClient from './external/database/DatabaseConnection';
import { setupRoutes } from './routes';

export const databaseConnection = new DatabaseClient();

const initializeApp = async () => {
    const PORT = process.env.PORT || 3000;
    databaseConnection.open();

    const server = new HttpServer();
    setupRoutes(server, databaseConnection);

    await server.listen(Number(PORT));
    console.log('Application initialized');

    process.on('SIGTERM', async () => {
        databaseConnection.close();
        process.exit(0);
    });
};

initializeApp().catch(console.error);
