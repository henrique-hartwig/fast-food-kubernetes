import { ProductCategoryUseCase } from '../usecases/ProductCategoryUseCase';


export class ProductCategoryController {
  constructor(private readonly productCategoryUseCase: ProductCategoryUseCase) {}

  async createProductCategory(req: any, res: any) {
    const { name, description } = req.body;
    await this.productCategoryUseCase.createProductCategory(name, description);
    res.status(201).json({ message: 'Product category created successfully!' });
  }

  async getProductCategoryById(req: any, res: any) {
    const productCategory = await this.productCategoryUseCase.getProductCategoryById(Number(req.params.id));
    if (productCategory) {
      res.json(productCategory);
    } else {
      res.status(404).json({ message: 'Product category not found' });
    }
  }

  async getAllProductCategories(req: any, res: any) {
    const productCategories = await this.productCategoryUseCase.getAllProductCategories();
    res.json(productCategories);
  }
}
