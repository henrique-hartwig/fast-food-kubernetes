import prisma from '../prisma/prismaClient';
import type { IProductCategoryRepository } from '../../../application/ports/IProductCategoryRepository';
import { ProductCategory } from '../../../domain/entities/ProductCategory';

export class PgProductCategoryRepository implements IProductCategoryRepository {
  async save(productCategory: ProductCategory): Promise<void> {
    await prisma.productCategory.create({
      data: {
        name: productCategory.name,
        description: productCategory.description,
      },
    });
  }

  async findById(id: number): Promise<ProductCategory | null> {
    const productCategoryData = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!productCategoryData) {
      return null;
    }

    return new ProductCategory(productCategoryData.id, productCategoryData.name, productCategoryData.description);
  }

  async findAll(): Promise<ProductCategory[]> {
    const productCategoriesData = await prisma.productCategory.findMany();
    return productCategoriesData.map((productCategoryData) => new ProductCategory(productCategoryData.id, productCategoryData.name, productCategoryData.description));
  }
}
