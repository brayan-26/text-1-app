const { pool } = require("../config/db.js");

async function loginUser(user, employee, password) {
  try {
    let conexion;

    conexion = pool.getConnection();
    if (user || employee) {
      console.log("melo");

      if (password) {
        console.log("password melo");
      } else {
        console.log("ingrese una contraseña");
      }
    } else {
      console.log("ingrese un usuario o empleado");
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conexion) {
      console.log(conexion);
    }
  }
}

module.exports = {};
