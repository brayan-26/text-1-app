const { pool } = require('../config/db')


async function loginEmployee(employee, user, password) {
    const conexion = await pool.getConnection();
    try {
        const sql = 'SELECT UserTypeID FROM users WHERE FullName = ? AND Password = ?'
        // validamos el fulllname con la contraseña
        const value = [employee , password]
        const [results] = await conexion.query(sql, value);

        // valiamos que el usuario exista 
        const sql2 = 'SELECT * FROM users WHERE Username = ?'
        const value2 = [user]
        const [results2] = await conexion.query(sql2,value2 )
        

        const UserTypeID = results[0].UserTypeID

        console.log(UserTypeID)
        if (UserTypeID === 1) {
            if(results.length > 0){
                console.log("el nombre completo y la contraseña esta melos")
                
            }else{
                console.log("nombre o contraseña incorrecta")
            }
        }else if(UserTypeID === 2){
            console.log("estas tratando de ingresar como un emepleado y NO LO ES")
        }else {
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

async function loginUser(user, password) {

    const conexion = await pool.getConnection();
    try {
        const sql = 'SELECT UserTypeID FROM users WHERE Username = ? AND Password = ?'
        const value = [user, password]

        const [results] = await conexion.query(sql, value);

        if (results.length > 0) {
            const UserTypeID = results[0].UserTypeID
            console.log("usuario encontrado");
            return UserTypeID;
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
