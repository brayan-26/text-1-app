import express from 'express';
import {conectar} from './config/db.js';
const app = express();

app.listen(3000, () => {
    console.log("Server on 3000")
})

// database 
conectar()