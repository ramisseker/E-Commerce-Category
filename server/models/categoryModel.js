import db from '../config/database.js';

export const getCategory = (result) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getCategoryById = (id, result) => {
  db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

export const getSubCategories = (id, result) => {
  db.query('SELECT * FROM subcategories', (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const insertCategory = (data, result) => {
  db.query('INSERT INTO categories SET ?', [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const editCategoriesById = (data, id, result) => {
  db.query(
    'UPDATE categories SET product_name = ? WHERE id = ?',
    [data.product_name, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

export const deleteCategoriesById = (id, result) => {
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getSubCategoriesById = (id, result) => {
  db.query(
    'SELECT * FROM subcategories  WHERE  category_id = ? ',
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};
