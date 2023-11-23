const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "session1",
  connectionLimit: 5,
});



module.exports = {
  pool,
};
