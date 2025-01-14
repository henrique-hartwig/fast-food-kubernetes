import { ProductCategoryService } from '../../application/services/ProductCategoryService';
import { PgProductCategoryRepository } from '../database/repository/PgProductCategory';

const productCategoryRepository = new PgProductCategoryRepository();
const productCategoryService = new ProductCategoryService(productCategoryRepository);

export class ProductCategoryController {
  async createProductCategory(req: any, res: any) {
    const { name, description } = req.body;
    await productCategoryService.createProductCategory(name, description);
    res.status(201).json({ message: 'Product category created successfully!' });
  }

  async getProductCategoryById(req: any, res: any) {
    const productCategory = await productCategoryService.getProductCategoryById(Number(req.params.id));
    if (productCategory) {
      res.json(productCategory);
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  }

  async getAllProductCategories(req: any, res: any) {
    const productCategories = await productCategoryService.getAllProductCategories();
    res.json(productCategories);
  }
}
