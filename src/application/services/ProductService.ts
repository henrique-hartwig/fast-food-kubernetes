import type { IProductRepository } from '../ports/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(name: string, description: string, price: number, categoryId: number): Promise<void> {
    const product = new Product(Date.now(), name, description, price, categoryId);
    await this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getProductsByCategoryId(categoryId: number): Promise<Product[]> {
    return this.productRepository.findByCategoryId(categoryId);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = { ...existingProduct, ...productData };
    await this.productRepository.update(updatedProduct);
    return updatedProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
