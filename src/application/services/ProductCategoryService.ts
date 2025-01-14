import type { IProductCategoryRepository } from '../ports/IProductCategoryRepository';
import { ProductCategory } from '../../domain/entities/ProductCategory';

export class ProductCategoryService {
  constructor(private productCategoryRepository: IProductCategoryRepository) {}

  async createProductCategory(name: string, description: string): Promise<void> {
    const productCategory = new ProductCategory(Date.now(), name, description);
    await this.productCategoryRepository.save(productCategory);
  }

  async getProductCategoryById(id: number): Promise<ProductCategory | null> {
    return this.productCategoryRepository.findById(id);
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.findAll();
  }
}
