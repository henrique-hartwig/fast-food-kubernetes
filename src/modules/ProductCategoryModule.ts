import type { IDatabaseConnection } from '../external/database/DatabaseConnection';
import { ProductCategoryRepository } from '../external/repository/ProductCategoryRepository';
import { ProductCategoryUseCase } from '../usecases/ProductCategoryUseCase';
import { ProductCategoryController } from '../controllers/ProductCategoryController';

export default function productCategoryModule(databaseClient: IDatabaseConnection) {
  const productCategoryRepository = new ProductCategoryRepository(databaseClient);
  const productCategoryUseCase = new ProductCategoryUseCase(productCategoryRepository);
  return new ProductCategoryController(productCategoryUseCase);
}