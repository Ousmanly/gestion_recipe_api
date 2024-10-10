import RecipeModel from '../models/RecipeModel.js';

class RecipeController {
  static async getAllRecipes(_req, res) {
    try {
      const result = await RecipeModel.getAllRecipes();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
    }
  }
  static async getRecipeById(req, res) {
    try {
      const { id } = req.params;
      const result = await RecipeModel.getRecipeById(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createRecipes(req, res, next) {
    try {
      const { title, ingredients, type, category_id } = req.body;
      await RecipeModel.createRecipes(title, ingredients, type, category_id);
      res.status(200).json({"message": "Recipe has been created succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
  static async deleteRecipes(req, res, next) {
    try {
      const { id } = req.params;
      await RecipeModel.deleteRecipes(id);
      res.status(200).json({"message": "Recipe has been deleted succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
  static async updateRecipes(req, res, next) {
    try {
      const { id } = req.params;
      const { title, ingredients, type, category_id } = req.body;
      await RecipeModel.updateRecipes(
        id,
        title,
        ingredients,
        type,
        category_id
      );
      res.status(200).json({"message": "Recipe has been updated succesfuly"});
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
}
export default RecipeController;
