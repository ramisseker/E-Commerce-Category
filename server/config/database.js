import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shopping1',
  password: '',
});

db.connect();

export default db;
