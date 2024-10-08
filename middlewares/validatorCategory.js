import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import CategoryModel from '../models/CategoryModel.js';
// import RecipeController from "../controllers/RecipeController.js";
// import RecipeModel from '../models/RecipeModel.js';

const addRequestCategoryValidatore = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail()
    .custom(async (value) => {
      const result = await CategoryModel.checkCategory(value);
      if (result !== 0) {
        throw new Error('This category is already exist!');
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
const updateRequestCategoryValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .bail()
    .custom(async (value) => {
      const result = await CategoryModel.checkCategoryById(value);
      if (result == 0) {
        throw new Error('Category not found!');
      }
      return true;
    }),
  check('name')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail()
    .custom(async (value, { req }) => {
      const result = await CategoryModel.checkCategory(value);
      if (result !== 0 && value !== req.body.originalName) {
        throw new Error('This category is already exist!');
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
const deleteRequestCategoryValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be number!')
    .bail()
    .custom(async (value) => {
      const result = await CategoryModel.checkCategoryById(value);
      if (result == 0) {
        throw new Error('Category not found!');
      }
      return true;
    })
    .bail()
    .custom(async (value) => {
      const result = await CategoryModel.checkRecipeById(value);
      if (result) {
        throw new Error(
          "Cannot delete this category because it's used in recipes!"
        );
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
  addRequestCategoryValidatore,
  deleteRequestCategoryValidatore,
  updateRequestCategoryValidatore,
};
