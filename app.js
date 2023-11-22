const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.disable("x-powered-by");

// vistas
app.set("view engine", "ejs");

app.use(express.static("public"));

// dejamos pasar los datos de la solucitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server on 3000")
})


app.get('/', (req,res)=>{
    res.render('index');
})

app.post('/login', (req, res)=>{
    const user = req.body.usuario;
    const employee = req.body.empleado;
    const password = req.body.contraseña;

    if(employee){
        console.log(employee)
        res.render('index')
    }else if(user){
        console.log(user)
        res.render('index')
    }
})