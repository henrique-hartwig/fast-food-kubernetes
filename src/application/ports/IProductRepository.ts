import { Product } from '../../domain/entities/Product';

export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: number): Promise<Product | null>;
  findByCategoryId(categoryId: number): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
