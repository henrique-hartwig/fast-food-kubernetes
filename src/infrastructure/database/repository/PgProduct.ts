import prisma from '../prisma/prismaClient';
import type { IProductRepository } from '../../../application/ports/IProductRepository';
import { Product } from '../../../domain/entities/Product';

export class PgProductRepository implements IProductRepository {
  async save(product: Product): Promise<void> {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    const productData = await prisma.product.findUnique({
      where: { id },
    });

    if (!productData) {
      return null;
    }

    return new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId);
  }

  async findByCategoryId(categoryId: number): Promise<Product[]> {
    const productsData = await prisma.product.findMany({
      where: { categoryId },
    });
    return productsData.map((productData) => new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId));
  }

  async findAll(): Promise<Product[]> {
    const productsData = await prisma.product.findMany();
    return productsData.map((productData) => new Product(productData.id, productData.name, productData.description, productData.price, productData.categoryId));
  }

  async update(product: Product): Promise<void> {
    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }
}
