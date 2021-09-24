import {
  getCategory,
  getCategoryById,
  insertCategory,
  editCategoriesById,
  deleteCategoriesById,
} from '../models/categoryModel.js';

export const showCategory = (req, res) => {
  getCategory((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
export const showCategoryById = (req, res) => {
  getCategoryById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
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
