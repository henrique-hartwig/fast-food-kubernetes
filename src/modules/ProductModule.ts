import type { IDatabaseConnection } from '../external/database/DatabaseConnection';
import ProductController from '../controllers/ProductController';
import { ProductUseCase } from '../usecases/ProductUseCase';
import { ProductRepository } from '../external/repository/ProductRepository';

export default function ProductModule(databaseConnection: IDatabaseConnection) {
    const productRepository = new ProductRepository(databaseConnection);
    const productUseCase = new ProductUseCase(productRepository);
    return new ProductController(productUseCase);
}
