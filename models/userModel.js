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
                    console.log("puede iniciar session")
                    return true;

                } else {
                    console.log("usuario no encontrado")
                    return null
                }

            } else if (UserTypeID === 2) {
                console.log("Estas tratando de aceder como empleado pero no lo es   ");
                return null
            }
        } else {
            const mensaje = ("empleado o contraseña incorrectas")
            console.log(mensaje)
            return mensaje, null
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
            const UserTypeID = results[0].UserTypeID
            console.log("usuario encontrado");
            // console.log
        } else {
            console.log("Error, el usuario NO encontrado");
            return null;
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
