import { Router } from 'express';
import healthModule from './modules/HealthModule';
import productCategoryModule from './modules/ProductCategoryModule';
import productModule from './modules/ProductModule';
import orderModule from './modules/OrderModule';
import paymentModule from './modules/PaymentModule';
import userModule from './modules/UserModule';
import type DatabaseConnection from './external/database/DatabaseConnection';
import type { IHttpServer } from './httpServer';


export const setupRoutes = (server: IHttpServer, databaseConnection: DatabaseConnection) => {
    const app = server.getApp();
    const apiRouter = Router();
    app.use('/api', apiRouter);

    const healthController = healthModule(databaseConnection);
    apiRouter.get('/health', (req, res) => healthController.healthCheck(req, res));
    apiRouter.get('/ready', (req, res) => healthController.readyCheck(req, res));

    const orderController = orderModule(databaseConnection);
    apiRouter.post('/orders', (req, res) => orderController.createOrder(req, res));
    apiRouter.get('/orders', (req, res) => orderController.getAllOrders(req, res));
    apiRouter.get('/orders/:id', (req, res) => orderController.getOrderById(req, res));

    const productCategoryController = productCategoryModule(databaseConnection);
    apiRouter.post('/product-categories', (req, res) => productCategoryController.createProductCategory(req, res));
    apiRouter.get('/product-categories', (req, res) => productCategoryController.getAllProductCategories(req, res));
    apiRouter.get('/product-categories/:id', (req, res) => productCategoryController.getProductCategoryById(req, res));

    const productController = productModule(databaseConnection);
    apiRouter.post('/products', (req, res) => productController.createProduct(req, res));
    apiRouter.get('/products', (req, res) => productController.getAllProducts(req, res));
    apiRouter.get('/products/:id', (req, res) => productController.getProductById(req, res));
    apiRouter.get('/products/category/:categoryId', (req, res) => productController.getProductsByCategoryId(req, res));
    apiRouter.put('/products/:id', (req, res) => productController.updateProduct(req, res));
    apiRouter.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

    const userController = userModule(databaseConnection);
    apiRouter.post('/users', (req, res) => userController.createUser(req, res));
    apiRouter.get('/users/:cpf', (req, res) => userController.getUserByCpf(req, res));

    const { paymentController, webhookController } = paymentModule(databaseConnection);
    apiRouter.post('/payments', (req, res) => paymentController.createPayment(req, res));
    apiRouter.get('/payments/:paymentId/status', (req, res) => webhookController.handlePaymentUpdate(req, res));
};
