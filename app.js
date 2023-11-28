const express = require('express');
const bodyParser = require('body-parser')
const { loginUser, loginEmployee } = require('./models/userModel')
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
    const mensaje = ""
    res.render('index', { mensaje });
})

app.post('/login', async (req, res) => {
    // llamos los datos del html
    const employee = req.body.empleado;
    const user = req.body.usuario;
    const password = req.body.contraseña;

    if (employee || user) {

        if (!employee) {
            if (user && password) {

                try {
                    const resultado = await loginUser(user, password)
                    mensaje = resultado.message;

                    if (resultado.succes === true) {
                        res.render('inicio', { mensaje })
                    }
                    else if (resultado.succes === null) {
                        res.render('index', { mensaje })
                    }

                } catch (error) {
                    console.log(error)
                    res.render('error')
                }
            } else {
                res.render('index', { mensaje: "ingrese un usuario y una contraseña" })
            }
        } else if (employee && password) {
            try {
                const resultado = await loginEmployee(employee, user, password);

                const mensaje = resultado.message;
                if (resultado.succes === true) {
                    res.render('inicio', { mensaje })
                } else if (resultado.succes === null) {
                    res.render('index', { mensaje })
                }

            } catch (error) {
                console.log(error)
                res.render('error')
            }
        } else {
            res.render('index', { mensaje: "ingrese un empleado y una contraseña" })
        }
    } else {
        res.render('index', { mensaje: "Ingrese un emepleado o un usuario" })
    }
});