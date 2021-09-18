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

export const getSubCategories = (result) => {
  db.query('SELECT * FROM subcategories', (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getSubCategoryById = (id, result) => {
  db.query(
    'SELECT * FROM subcategories WHERE category_id = ?',
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

export const getSubCategories2 = (result) => {
  db.query('SELECT * FROM subcategories2', (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const getSubCategoryById2 = (id, result) => {
  db.query(
    'SELECT * FROM subcategories2 WHERE subcat_id = ?',
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
  db.query('INSERT INTO categories SET ?', [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const insertSubCategory = (data, result) => {
  db.query(
    'INSERT INTO subcategories (subcatname, category_id) VALUES (?,?)',
    [data.subcatname, data.category_id],
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

export const insertSubCategory2 = (data, result) => {
  console.log('data');
  console.log(data);
  db.query(
    'INSERT INTO subcategories2 (subcatname2, subcat_id) VALUES (?,?)',
    [data.subcatname2, data.subcat_id],
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
