// index html
const contraseña = document.getElementById("contraseña");
const mostrarPassword = document.getElementById("chePassword");

mostrarPassword.addEventListener("change", () => {
  if (mostrarPassword.checked) {
    contraseña.type = "text";
  } else {
    contraseña.type = "password";
  }
});
