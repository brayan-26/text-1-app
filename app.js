const express = require("express");
const bodyParser = require("body-parser");
const { loginUser, loginEmployee } = require("./models/loginUser");
const { registerUser } = require("./models/registerUser");
const { consultTravel } = require("./models/main");
const app = express();

app.disable("x-powered-by");

// vistas
app.set("view engine", "ejs");

app.use(express.static("public"));

// dejamos pasar los datos de la solucitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server on 3000");
});

// login
app.get("/", (req, res) => {
  const mensaje = "";
  res.render("index", { mensaje });
});

app.post("/login-user", async (req, res) => {
  // llamos los datos del html
  const employee = req.body.empleado;
  const user = req.body.usuario;
  const password = req.body.contraseña;


  if (employee || user) {
    if (!employee) {
      if (user && password) {
        try {
          const resultado = await loginUser(user, password);
          mensaje = resultado.message;
          const resultadoMain = await consultTravel();
          area = resultadoMain.Area;
          capacidad = resultadoMain.Capacidad;
          item = resultadoMain.Item;
          title = resultadoMain.Title;
          
          if (resultado.succes === true) {
            console.log(resultadoMain)
            res.render("inicio");
          } else if (resultado.succes === null) {
            res.render("index", { mensaje });
          }
        } catch (error) {
          console.log(error);
          res.render("error");
        }
      } else {
        res.render("index", { mensaje: "Ingrese un usuario y una contraseña" });
      }
    } else if (employee && password) {
      try {
        const resultado = await loginEmployee(employee, user, password);

        const mensaje = resultado.message;
        if (resultado.succes === true) {
          res.render("inicio");
        } else if (resultado.succes === null) {
          res.render("index", { mensaje });
        }
      } catch (error) {
        console.log(error);
        res.render("error");
      }
    } else {
      res.render("index", { mensaje: "Ingrese un empleado y una contraseña" });
    }
  } else {
    res.render("index", { mensaje: "Ingrese un emepleado o un usuario" });
  }
});

// register
app.get("/register", (req, res) => {
  const mensaje = "";
  res.render("register", { mensaje });
});

app.post("/register-user", async (req, res) => {
  const name = req.body.nombre;
  const fullName = req.body.nombreCompleto;
  const birthday = req.body.cumpleaños;
  const password = req.body.contraseña;
  const passwordRepi = req.body.contraseñaRepi;
  const gender = req.body.genero;
  const numberGender = req.body.miembroFami;

  if (
    name &&
    fullName &&
    birthday &&
    password &&
    passwordRepi &&
    gender &&
    numberGender
  ) {
    if (password === passwordRepi) {
      if (password.length >= 5) {
        try {
          const resultado = await registerUser(
            name,
            password,
            fullName,
            gender,
            birthday,
            numberGender
          );
          const mensaje = resultado.message;

          if (resultado.succes === true) {
            res.render("index");
          } else if (resultado.succes === null) {
            res.render("register", { mensaje });
          }
        } catch (error) {
          console.log(error);
          res.render("error");
        }
      } else {
        res.render("register", {
          mensaje: "La contraseña debe de tener como minimo 5 digitos",
        });
      }
    } else {
      res.render("register", {
        mensaje: `Las contraseñas NO coinciden ${password} ${passwordRepi} `,
      });
    }
  } else {
    res.render("register", { mensaje: "Ingrese todos los datos" });
  }
});



// error 404
app.use((req, res) => {
  res.render("error");
});

