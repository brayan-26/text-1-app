import mysql from 'mysql2/promise';

const db = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'session2'
}

export async function conectar() {
    try {
        const conexion = await mysql.createPool(db);
        console.log("Database on ");
    }
    catch (error) {
        console.log(`Error connection database ${error}`);
    }
};