import { ProductUseCase } from '../usecases/ProductUseCase';


export default class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async createProduct(req: any, res: any) {
    try {
      const { name, description, price, categoryId } = req.body;
      await this.productUseCase.createProduct(name, description, price, categoryId);
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
      const product = await this.productUseCase.getProductById(Number(req.params.id));
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
      const products = await this.productUseCase.getProductsByCategoryId(Number(req.params.categoryId));
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
      const products = await this.productUseCase.getAllProducts();
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
      const updatedProduct = await this.productUseCase.updateProduct(Number(id), productData);
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const { id } = req.params;
      await this.productUseCase.deleteProduct(Number(id));
      return res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
