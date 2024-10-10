import CategoryModel from '../models/CategoryModel.js';
// import RecipeModel from '../models/RecipeModel.js';

class CategoryController {
  static async getAllCategories(_req, res) {
    try {
      const result = await CategoryModel.getAllCategories();
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.getCategoryById(id);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }

  static async createCategories(req, res, next) {
    try {
      const { name } = req.body;
      await CategoryModel.createCategories(name);
      res.status(200).json({"message": "Category has been created succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
  static async deleteCategories(req, res, next) {
    try {
      const { id } = req.params;
      await CategoryModel.deleteCategories(id);
      res.status(200).json({"message": "Category has been deleted succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
  static async updateCategories(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await CategoryModel.updateCategories(id, name);
      res.status(200).json({"message": "Category has been updated succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
}
export default CategoryController;
