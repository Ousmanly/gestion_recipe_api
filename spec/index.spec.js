import RecipeModel from '../models/RecipeModel.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can be create', async () => {
    const recipe = {
      title: 'crepe test',
      type: 'desert',
      ingredients: 'farime, lait',
      category_id: 1,
    };
    const checkTitle = await RecipeModel.checkRecipes(recipe.title);
    if (checkTitle === 0) {
      const result = await RecipeModel.createRecipes(
        recipe.title,
        recipe.type,
        recipe.ingredients,
        recipe.category_id
      );
      recipeId = result.insertId;
      const recipeCreated = await RecipeModel.getRecipeById(recipeId);

      expect(recipeId).not.toBeNull();
      expect(recipeCreated).not.toBeNull();
    }
  });

  it('can not be create', async () => {
    try {
      const recipe = { title: null, type: 'dessert', ingredient: 'farime' };
      const result = await RecipeModel.createRecipes(
        recipe.title,
        recipe.type,
        recipe.ingredient
      );
      recipeId = result.insertId;
      const recipeCreated = await RecipeModel.getRecipeById(recipeId);
      expect(recipeId).toBeNull();
      expect(recipeCreated).toEqual([]);
    } catch (error) {}
  });

  it('Can get all recipes', async () => {
    const getAll = await RecipeModel.getAllRecipes();
    expect(getAll).not.toBeNull();
  });

  it('Can delete recipes', async () => {
    let id = 3;
    await RecipeModel.deleteRecipes(id);
    const recipe = await RecipeModel.getRecipeById(id);
    expect(recipe).toEqual([]);
  });

  it('Can not delete recipes', async () => {
    let id = 70;
    const deleteRecipe = await RecipeModel.deleteRecipes(id);
    expect(deleteRecipe).toBe(0);
    const recipe = await RecipeModel.getRecipeById(id);
    expect(recipe).toEqual([]);
  });

  it('Can update recipes', async () => {
    const recipe = {
      id: 2,
      title: 'crenpe Modify',
      ingredients: 'farime, Oeuf',
      type: 'dessert',
      category_id: 1,
    };
    const checkTitle = await RecipeModel.checkRecipes(recipe.title);
    if (checkTitle === 0) {
      await RecipeModel.updateRecipes(
        recipe.id,
        recipe.title,
        recipe.ingredients,
        recipe.type,
        recipe.category_id
      );

      const updatedRecipe = await RecipeModel.getRecipeById(recipe.id);
      expect(updatedRecipe[0].title).toBe(recipe.title);
      expect(updatedRecipe[0].ingredient).toBe(recipe.ingredient);
      expect(updatedRecipe[0].type).toBe(recipe.type);
    }
  });

  it('Can not update recipes', async () => {
    const recipe = {
      id: 5000,
      title: 'crenpe',
      ingredient: 'farime',
      type: 'dessert',
    };
    const updateRecipe = await RecipeModel.updateRecipes(
      recipe.id,
      recipe.title,
      recipe.ingredient,
      recipe.type
    );
    expect(updateRecipe).toBe(0);
  });
});
import CategoryModel from '../models/CategoryModel.js';

describe('Category tests', () => {
  let categoryId = null;

  it('can create category', async () => {
    const category = { name: `just test` };
    const checkCategory = await CategoryModel.checkCategory(category.name);
    if (checkCategory === 0) {
      const result = await CategoryModel.createCategories(category.name);
      categoryId = result.insertId;
      const categoryCreated = await CategoryModel.getCategoryById(categoryId);
      expect(categoryId).not.toBeNull();
      expect(categoryCreated).not.toBeNull();
    }
  });

  it('can not create category', async () => {
    try {
      const category = { name: null };
      const result = await CategoryModel.createCategories(category.name);
      categoryId = result.insertId;
      const categoryCreated = await CategoryModel.getCategoryById(categoryId);
      expect(categoryId).toBeNull();
      expect(categoryCreated).toEqual([]);
    } catch (error) {}
  });

  it('Can get all categories', async () => {
    const getAll = await CategoryModel.getAllCategories();
    expect(getAll).not.toBeNull();
  });

  it('Can delete category', async () => {
    let id = 3;
    await CategoryModel.deleteCategories(id);
    const category = await CategoryModel.getCategoryById(id);
    expect(category).toEqual([]);
  });

  it('Can not delete category', async () => {
    let id = 700;
    const deleteRecipe = await CategoryModel.deleteCategories(id);
    expect(deleteRecipe).toBe(0);
    const category = await CategoryModel.getCategoryById(id);
    expect(category).toEqual([]);
  });

  it('Can update category', async () => {
    const category = {
      id: 2,
      name: 'omelette',
    };
    await CategoryModel.updateCategories(category.id, category.name);

    const updatedCategory = await CategoryModel.getCategoryById(category.id);

    expect(updatedCategory[0].name).toBe(category.name);
  });

  it('Can not update category', async () => {
    const category = {
      id: 5000,
      name: 'crenpe',
    };
    const updateCategory = await CategoryModel.updateCategories(
      category.id,
      category.name
    );
    expect(updateCategory).toBe(0);
  });
});
