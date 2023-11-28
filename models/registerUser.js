const { pool } = require("../config/db");

async function registerUser(
  name,
  fullName,
  birthday,
  password,
  gender,
  numberGender
) {
  const conexion = await pool.getConnection();
  try {
    const sqlUser = "SELECT * FROM users WHERE Username = ?";
    const valueUSer = [name];
    const [resultsUser] = await conexion.query(sqlUser, valueUSer);
    if (resultsUser.length > 0) {
      return { succes: null, message: `el usuario ${name} ya existe` };
    } else {
      const idQuery = "SELECT MAX(ID) FROM users";
      const idResult = await conexion.query(idQuery);
      const nextID = idResult[0].ID;
      console.log(idResult)

      // const sql =
      //   "INSERT INTO users (ID, UserTypeID, Username, Password, FullName, Gender, BirthDate, FamilyCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      // const value = [
      //   nextID,
      //   2,
      //   name,
      //   password,
      //   fullName,
      //   gender,
      //   birthday,
      //   numberGender,
      // ];
      // const [results] = await conexion.query(sql, value);
      // if (results.length > 0) {
      //   console.log("usuario registrado");
      //   return { succes: true };
      // } else {
      //   return { succes: null, message: "no se pudo registrar el uusario" };
      // }
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  } finally {
    conexion.release();
  }
}

module.exports = {
  registerUser,
};
