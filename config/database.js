require('dotenv').config();
const mysql = require('mysql2');

const conect = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
  queueLimit: 0
});
module.exports = conect;