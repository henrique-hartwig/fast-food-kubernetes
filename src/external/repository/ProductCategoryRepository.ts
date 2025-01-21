import type { IDatabaseConnection } from '../database/DatabaseConnection';
import { ProductCategory } from '../../domain/ProductCategory';


export interface IProductCategoryRepository {
  save(productCategory: ProductCategory): Promise<void>;
  findById(id: number): Promise<ProductCategory | null>;
  findAll(): Promise<ProductCategory[]>;
}

export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(private readonly databaseConnection: IDatabaseConnection) {}

  async save(productCategory: ProductCategory): Promise<void> {
    await this.databaseConnection.productCategory.create({
      data: {
        name: productCategory.name,
        description: productCategory.description,
      },
    });
  }

  async findById(id: number): Promise<ProductCategory | null> {
    const productCategoryData = await this.databaseConnection.productCategory.findUnique({
      where: { id },
    });

    if (!productCategoryData) {
      return null;
    }

    return new ProductCategory(productCategoryData.id, productCategoryData.name, productCategoryData.description);
  }

  async findAll(): Promise<ProductCategory[]> {
    const productCategoriesData = await this.databaseConnection.productCategory.findMany();
    return productCategoriesData.map((productCategoryData) => new ProductCategory(productCategoryData.id, productCategoryData.name, productCategoryData.description));
  }
}
