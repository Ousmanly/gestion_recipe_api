import db from '../config/db.js';
class CategoryModel {
  static async checkCategory(name) {
    try {
      const [results] = await db.query(
        'SELECT * FROM categories WHERE name = ?',
        [name]
      );
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
  static async checkRecipeById(id) {
    try {
      const [results] = await db.query(
        'SELECT * FROM recipes WHERE category_id = ?',
        [id]
      );
      return results.length > 0;
    } catch (error) {
      throw error;
    }
  }
  static async getCategoryById(id) {
    try {
      const [results] = await db.query(
        'SELECT * FROM categories WHERE id = ?',
        [id]
      );
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories() {
    try {
      const [results] = await db.query('SELECT * FROM categories');
      return results;
    } catch (error) {
      throw error;
    }
  }
  static async createCategories(name) {
    try {
      const [result] = await db.query(
        'INSERT INTO categories(name) VALUES (?)',
        [name]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  static async deleteCategories(id) {
    try {
      const [result] = await db.query('DELETE FROM categories WHERE id =?', [
        id,
      ]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  static async updateCategories(id, name) {
    try {
      const [result] = await db.query(
        'UPDATE categories SET name=? WHERE id=?',
        [name, id]
      );

      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}
export default CategoryModel;
