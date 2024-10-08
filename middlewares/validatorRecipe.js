import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
// import RecipeController from "../controllers/RecipeController.js";
import RecipeModel from '../models/RecipeModel.js';

const addRequestValidatore = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required!')
    .bail()
    .isString()
    .withMessage("Title can't be number!")
    .bail()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters long!')
    .bail()
    .custom(async (value) => {
      const result = await RecipeModel.checkRecipes(value);
      if (result !== 0) {
        throw new Error('This recipe is already exist!');
      }
      return true;
    }),
  check('ingredients')
    .not()
    .isEmpty()
    .withMessage('Ingredient is required!')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Ingredient must be at least 10 characters long!')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Ingredient cannot be more than 500 characters long!')
    .bail()
    .isString()
    .withMessage("Ingredient can't be number!")
    .bail(),
  check('type')
    .not()
    .isEmpty()
    .withMessage('Type is required!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Type must be at least 3 characters long')
    .bail()
    .isString()
    .withMessage("Type can't be number")
    .bail()
    .withMessage("Type can't be number")
    .bail()
    .custom(async (value) => {
      const validTypes = ['plat', 'desert', 'entry'];
      if (!validTypes.includes(value.toLowerCase())) {
        throw new Error('Type recipe must be "plat", "desert", or "entry"!');
      }
      return true;
    })
    .bail(),
  check('category_id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .bail()
    .custom(async (value) => {
      const result = await RecipeModel.checkCategoryById(value);
      if (result == 0) {
        throw new Error('Category with this id not found!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const updateRequestValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .bail()
    .custom(async (value) => {
      const result = await RecipeModel.checkRecipeById(value);
      if (result == 0) {
        throw new Error('Recipe not found!');
      }
      return true;
    }),
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required!')
    .bail()
    .isString()
    .withMessage("Title can't be number!")
    .bail()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters long!')
    .bail()
    .custom(async (value, { req }) => {
      const result = await RecipeModel.checkRecipes(value);
      if (result !== 0 && value !== req.body.originalTitle) {
        throw new Error('This recipe title is already exist!');
      }
      return true;
    }),
  check('ingredients')
    .not()
    .isEmpty()
    .withMessage('Ingredient is required!')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Ingredient must be at least 10 characters long!')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Ingredient cannot be more than 500 characters long!')
    .bail()
    .isString()
    .withMessage("Ingredient can't be number!")
    .bail(),
  check('type')
    .not()
    .isEmpty()
    .withMessage('Type is required!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Type must be at least 3 characters long')
    .bail()
    .isString()
    .withMessage("Type can't be number")
    .bail()
    .withMessage("Type can't be number")
    .bail()
    .custom(async (value) => {
      const validTypes = ['plat', 'desert', 'entry'];
      if (!validTypes.includes(value.toLowerCase())) {
        throw new Error('Type recipe must be "plat", "desert", or "entry"!');
      }
      return true;
    })
    .bail(),
  check('category_id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .custom(async (value) => {
      const result = await RecipeModel.checkCategoryById(value);
      if (result == 0) {
        throw new Error('Category with this id not found!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const deleteRequestValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .bail()
    .custom(async (value) => {
      const result = await RecipeModel.checkRecipeById(value);
      if (result == 0) {
        throw new Error('Recipe not found!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export {
  addRequestValidatore,
  deleteRequestValidatore,
  updateRequestValidatore,
};
