const { pool } = require('../config/db');


async function consultTravel() {
    const conexion = await pool.getConnection();
    try {
        // obtenemos los datos sql
        const sql = 'SELECT Title, Capacity, AreaID, ItemTypeID FROM items'
        const datos = await conexion.query(sql);
        return datos;

    } catch (error) {
        console.log(error)
    } finally {
        conexion.release();
    }
}

module.exports = {
    consultTravel
}