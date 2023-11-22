const { pool } = require("../config/db.js");

let conexion; 

// async function register(user, password) {
//   let conexion;
//   try {
//     conexion = pool.getConnection();
//     const query = "INSERT INTO user SET usuario = ? AND password = ?";
//     const value = [user, password];

//     (await conexion).execute(query, value);
//   } catch (error) {
//     console.log(`Error connection database ${error}`);
//   } finally {
//     if (conexion) {
//       (await conexion).release();
//     }
//   }
// }

async function login() {
    try{
        conexion = pool.getConnection();
        const query = ""

    }catch(error){

    }finally{

    }
}

module.exports = {
  register,
};
