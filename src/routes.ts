import { Router } from 'express';
import DatabaseClient from './external/database/DatabaseConnection';
import healthModule from './modules/HealthModule';
import productCategoryModule from './modules/ProductCategoryModule';
import productModule from './modules/ProductModule';
import orderModule from './modules/OrderModule';
import paymentModule from './modules/PaymentModule';
import userModule from './modules/UserModule';


const router = Router();
export const databaseConnection = new DatabaseClient();

const healthController = healthModule(databaseConnection);
router.get('/health', healthController.healthCheck);
router.get('/ready', healthController.readyCheck);

const orderController = orderModule(databaseConnection);
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);

const productCategoryController = productCategoryModule(databaseConnection);
router.post('/product-categories', productCategoryController.createProductCategory);
router.get('/product-categories', productCategoryController.getAllProductCategories);
router.get('/product-categories/:id', productCategoryController.getProductCategoryById);

const productController = productModule(databaseConnection);
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:categoryId', productController.getProductsByCategoryId);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

const userController = userModule(databaseConnection);
router.post('/users', userController.createUser);
router.get('/users/:cpf', userController.getUserByCpf);

const paymentController = paymentModule(databaseConnection);
router.post('/payments', paymentController.createPayment);

export { router as routes };
