import db from '../config/database.js';

export const getCategory = (result) => {
  db.query(
    'SELECT * FROM category WHERE category_id IS NULL',
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

export const getCategoryById = (id, result) => {
  db.query(
    'SELECT * FROM category WHERE category_id = ?',
    [id],
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

export const insertCategory = (data, result) => {
  db.query(
    'INSERT INTO category (category_name, category_id) VALUES(?,?)',
    [data.category_name, data.category_id],
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

export const editCategoriesById = (data, id, result) => {
  db.query(
    'UPDATE category SET category_name = ? WHERE id = ?',
    [data.category_name, id],
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
  db.query('DELETE FROM category WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
