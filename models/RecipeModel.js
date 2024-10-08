import db from '../config/db.js';
class RecipeModel {
  static async checkRecipes(title) {
    try {
      const [results] = await db.query(
        'SELECT * FROM recipes WHERE title = ?',
        [title]
      );
      return results.length;
    } catch (error) {
      throw error;
    }
  }
  static async checkRecipeById(id) {
    try {
      const [results] = await db.query('SELECT * FROM recipes WHERE id = ?', [
        id,
      ]);
      return results.length;
    } catch (error) {
      throw error;
    }
  }
  static async checkCategoryById(id) {
    try {
      const [results] = await db.query(
        'SELECT * FROM categories WHERE id = ?',
        [id]
      );
      return results.length;
    } catch (error) {
      throw error;
    }
  }
  static async getRecipeById(id) {
    try {
      const [results] = await db.query('SELECT * FROM recipes WHERE id = ?', [
        id,
      ]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // static async getAllRecipes() {
  //   try {
  //     const [results] = await db.query('SELECT * FROM recipes');
  //     return results;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async getAllRecipes() {
    try {
      const [results] = await db.query(`
            SELECT recipes.*, categories.name AS category_name 
            FROM recipes 
            LEFT JOIN categories ON recipes.category_id = categories.id
        `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async createRecipes(title, ingredients, type, category_id) {
    try {
      const [result] = await db.query(
        'INSERT INTO recipes(title, ingredients, type, category_id) VALUES (?, ?, ?, ?)',
        [title, ingredients, type, category_id]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async deleteRecipes(id) {
    try {
      const [result] = await db.query('DELETE FROM recipes WHERE id =?', [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  static async updateRecipes(id, title, ingredients, type, category_id) {
    try {
      const [result] = await db.query(
        'UPDATE recipes SET title=?, ingredients=?, type=?, category_id=?  WHERE id=?',
        [title, ingredients, type, category_id, id]
      );

      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}
export default RecipeModel;
