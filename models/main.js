const { pool } = require('../config/db');


async function consultTravel() {
    const conexion = await pool.getConnection();
    try {
        const sql = 'SELECT Title FROM items'
        // const sql = 'SELECT Title, Capacity, AreaID, ItemTypeID FROM items'

        // obtenemos los titulos
        const title = await conexion.query(sql);
        return title;

    } catch (error) {
        console.log(error)
    } finally {
        conexion.release();
    }
}

module.exports = {
    consultTravel
}