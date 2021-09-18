import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { validateRegister, isLoggedIn } from '../middleware/users.js';
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  showCategory,
  showCategoryById,
  showSubCategory,
  showSubCategoryById,
  updateCategory,
  showSubCategory2,
  showSubCategoryById2,
  createSubCategory2,
} from '../controllers/categories.js';

const router = express.Router();

router.post('/sign-up', validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!',
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, username, password, registered) VALUES ('${uuidv4()}', ${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!',
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!',
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!',
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              'SECRETKEY',
              {
                expiresIn: '7d',
              }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!',
          });
        }
      );
    }
  );
});
router.get('/secret-route', isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get('/categories', showCategory);

router.get('/subcategories', showSubCategory);

router.get('/subcategories2', showSubCategory2);

router.get('/categories/:id', showCategoryById);

router.get('/subcategories/:id', showSubCategoryById);

router.get('/subcategories2/:id', showSubCategoryById2);

router.post('/categories', createCategory);

router.post('/subcategories', createSubCategory);

router.post('/subcategories2', createSubCategory2);

router.put('/categories/:id', updateCategory);

router.delete('/categories/:id', deleteCategory);

export default router;
