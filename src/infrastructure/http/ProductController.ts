import { ProductService } from '../../application/services/ProductService';
import { PgProductRepository } from '../database/repository/PgProduct';


const productRepository = new PgProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
  async createProduct(req: any, res: any) {
    try {
      const { name, description, price, categoryId } = req.body;
      await productService.createProduct(name, description, price, categoryId);
      return res.status(201).json({ message: 'Product created successfully!' });
    } catch (error: any) {
      console.error('Error creating product:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getProductById(req: any, res: any) {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).json({ message: 'Product not found' });
    } catch (error: any) {
      console.error('Error searching product:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getProductsByCategoryId(req: any, res: any) {
    try {
      const products = await productService.getProductsByCategoryId(Number(req.params.categoryId));
      return res.status(200).json(products);
    } catch (error: any) {
      console.error('Error searching products by category:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async getAllProducts(req: any, res: any) {
    try {
      const products = await productService.getAllProducts();
      console.log('products', products);
      return res.status(200).json(products);
    } catch (error: any) {
      console.error('Error searching products:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message 
      });
    }
  }

  async updateProduct(req: any, res: any) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(Number(id), productData);
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(Number(id));
      return res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
