const { pool } = require('../config/db');


async function consultTravel() {
    const conexion = await pool.getConnection();
    try {
        const sql = 'SELECT Title, Capacity, AreaID, ItemTypeID FROM items'
        const [results] = await conexion.query(sql);
        return results


    } catch (error) {
        console.log(error)
    } finally {
        conexion.release();
    }
}

module.exports = {
    consultTravel
}