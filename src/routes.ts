import { Router } from 'express';
import { OrderController } from './infrastructure/http/OrderController';
import { ProductCategoryController } from './infrastructure/http/ProductCategoryController';
import { ProductController } from './infrastructure/http/ProductController';
import { UserController } from './infrastructure/http/UserController';
import { HealthController } from './infrastructure/http/HealthController';


const router = Router();

const healthController = new HealthController();
router.get('/health', healthController.healthCheck);
router.get('/ready', healthController.readinessCheck);

const orderController = new OrderController();
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);

const productCategoryController = new ProductCategoryController();
router.post('/product-categories', productCategoryController.createProductCategory);
router.get('/product-categories', productCategoryController.getAllProductCategories);
router.get('/product-categories/:id', productCategoryController.getProductCategoryById);

const productController = new ProductController();
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:categoryId', productController.getProductsByCategoryId);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

const userController = new UserController();
router.post('/users', userController.createUser);
router.get('/users/:cpf', userController.getUserByCpf);

export { router as routes };
