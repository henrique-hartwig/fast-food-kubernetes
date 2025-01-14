import { ProductCategory } from '../../domain/entities/ProductCategory';

export interface IProductCategoryRepository {
  save(productCategory: ProductCategory): Promise<void>;
  findById(id: number): Promise<ProductCategory | null>;
  findAll(): Promise<ProductCategory[]>;
}
