const express = require('express');
const bodyParser = require('body-parser')
const { loginUser , loginEmployee} = require('./models/userModel')
const app = express();

app.disable("x-powered-by");

// vistas
app.set("view engine", "ejs");

app.use(express.static("public"));

// dejamos pasar los datos de la solucitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server on 3000")
})


app.get('/', (req, res) => {
    res.render('index');
})

app.post('/login', async (req, res) => {
    // llamos los datos del html
    const employee = req.body.empleado;
    const user = req.body.usuario;
    const password = req.body.contraseña;
    if (employee || user) {
        if (employee) {
            try{
                const resultado = await loginEmployee(employee, user, password);
                console.log(resultado);

            }catch(error){
                console.log(error)
                res.render('error')
            }

        } else if (!employee) {

            if (user && password) {

                try {
                    const resultado = await loginUser(user, password)
                    console.log(resultado)

                    if (resultado === 1) {
                        res.render('index')
                        console.log("Estas tratando de ingresar como usuario, pero no lo es")
                    } else if (resultado === null) {
                        res.render('index')
                    } else {
                        res.render('inicio')
                    }

                } catch (error) {
                    console.log(error)
                    res.render('error')
                }
            } else {
                console.log("ingrese un usuario y una contraseña")
            }
        }
    }else{
        console.log("Ingrese un emepleado o un usuario")
    }
});