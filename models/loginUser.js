const { pool } = require('../config/db')


async function loginEmployee(employee, user, password) {
    const conexion = await pool.getConnection();
    try {
        // solicitud del tipo de usuario
        const sql = 'SELECT UserTypeID FROM users WHERE FullName = ? AND Password = ?';
        const value = [employee, password];
        const [results] = await conexion.query(sql, value);

        if (results.length > 0) {
            const UserTypeID = results[0].UserTypeID;

            if (UserTypeID === 1) {

                const SQLUser = 'SELECT * FROM users WHERE Username = ?'
                const valueUser = [user]
                const [resultsUser] = await conexion.query(SQLUser, valueUser)

                if (resultsUser.length > 0) {
                    return  {succes: true, message: `Bienvenido ${user}`}
                } else {
                    return {succes: null , message: "usuario NO encontrado"}
                }

            } else if (UserTypeID === 2) {
                return {succes: null , message: "Estas tratando de aceder como empleado pero no lo es"}
            }
        } else {
            return {succes: null , message: "empleado o contraseña incorrectas"}
        }

    } catch (error) {
        // mostramos posibles errores
        console.log(error);
    } finally {
        // soltamos la conexion
        conexion.release();
    }
}

async function loginUser(user, password) {

    const conexion = await pool.getConnection();
    try {
        const sql = 'SELECT UserTypeID FROM users WHERE Username = ? AND Password = ?'
        const value = [user, password]

        const [results] = await conexion.query(sql, value);

        if (results.length > 0) {
            const UserTypeID = results[0].UserTypeID;

            if (UserTypeID === 2) {
                return  {succes: true, message: `Bienvenido ${user}`}

            } else if (UserTypeID === 1) {
                return {succes: null , message: "Estas tratando de aceder como usuario pero NO lo es."}
            }
        } else {
            return {succes: null , message: "usuario o contraseña incorrectas."}
        }


    } catch (error) {
        // mostramos posibles errores
        console.log(error);
    } finally {
        // soltamos la conexion
        conexion.release();
    }
}

module.exports = {
    loginUser,
    loginEmployee
};
