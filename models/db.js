const mysql = require('mysql');
const connection = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'solutionOne'
});

module.exports = connection;  