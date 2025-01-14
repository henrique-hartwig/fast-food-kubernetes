import type { Request, Response } from 'express';
import { ProductService } from '../../application/services/ProductService';
import { PgProductRepository } from '../database/repository/PgProduct';

const productRepository = new PgProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
  async createProduct(req: any, res: any) {
    const { name, description, price, categoryId } = req.body;
    await productService.createProduct(name, description, price, categoryId);
    res.status(201).json({ message: 'Product created successfully!' });
  }

  async getProductById(req: any, res: any) {
    const product = await productService.getProductById(Number(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  async getProductsByCategoryId(req: any, res: any) {
    const products = await productService.getProductsByCategoryId(Number(req.params.categoryId));
    res.json(products);
  }

  async getAllProducts(req: any, res: any) {
    const products = await productService.getAllProducts();
    res.json(products);
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(Number(id), productData);
      res.json(updatedProduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await productService.deleteProduct(Number(id));
    res.status(200).json({ message: 'Product deleted successfully!' });
  }
}
