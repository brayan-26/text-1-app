const ventanaTravel = document.getElementById('traveler');
const ventanaOwner = document.getElementById('manager');

// creamos las ventanas para navegar
function abrirTravel() {
    ventanaTravel.style.display = "block";
    ventanaOwner.style.display = "none";
}

function abrirOwner() {
    ventanaOwner.style.display = "block";
    ventanaTravel.style.display = "none";
}

