import type { IDatabaseConnection } from '../database/DatabaseConnection';
import { Product } from '../../domain/Product';


export interface IProductRepository {
  save(product: Product): Promise<void>;
  findById(id: number): Promise<Product | null>;
  findByCategoryId(categoryId: number): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}

export class ProductRepository implements IProductRepository {
  constructor(private readonly databaseConnection: IDatabaseConnection) {}

  async save(product: Product): Promise<void> {
    await this.databaseConnection.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    const productData = await this.databaseConnection.product.findUnique({
      where: { id },
    });

    if (!productData) {
      return null;
    }

    return new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId);
  }

  async findByCategoryId(categoryId: number): Promise<Product[]> {
    const productsData = await this.databaseConnection.product.findMany({
      where: { categoryId },
    });
    return productsData.map((productData) => new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId));
  }

  async findAll(): Promise<Product[]> {
    const productsData = await this.databaseConnection.product.findMany();
    return productsData.map((productData) => new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId));
  }

  async update(product: Product): Promise<void> {
    await this.databaseConnection.product.update({
      where: { id: product.id },
      data: product,
    });
  }

  async delete(id: number): Promise<void> {
    await this.databaseConnection.product.delete({
      where: { id },
    });
  }
}
