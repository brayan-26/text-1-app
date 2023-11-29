// register terminos y condiciones
const containerTerminos = document.getElementById('terminos');
const verTerminosCondiciones = document.getElementById('verTerminos');
const aceptarTerminos = document.getElementById('aceptarTerminos');
const botonRegistrar = document.getElementById('buttonRegister');

//funcion para mostramos los terminos
function abrir() {
  containerTerminos.style.display = 'block';
}
// Función para cerrar los términos
function cerrar() {
  containerTerminos.style.display = 'none';
}

verTerminosCondiciones.addEventListener('click', ()=>{
    aceptarTerminos.disabled = false; 
});

// cuando acepte los terminos lo deje registrar
aceptarTerminos.addEventListener('change', ()=>{
    if(aceptarTerminos.checked){
        botonRegistrar.disabled = false; 
    }else{
        botonRegistrar.disabled = true; 
    }
});