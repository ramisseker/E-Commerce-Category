// Import function from Product Model
import {
  getCategory,
  getCategoryById,
  getSubCategories,
  insertCategory,
  editCategoriesById,
  deleteCategoriesById,
} from '../models/categoryModel.js';

// Get All Products
export const showCategory = (req, res) => {
  getCategory((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Get Single Product
export const showCategoryById = (req, res) => {
  getCategoryById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

export const showSubCategory = (req, res) => {
  getSubCategories((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Create New Product
export const createCategory = (req, res) => {
  const data = req.body;
  insertCategory(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update Product
export const updateCategory = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  editCategoriesById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete Product
export const deleteCategory = (req, res) => {
  const id = req.params.id;
  deleteCategoriesById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
