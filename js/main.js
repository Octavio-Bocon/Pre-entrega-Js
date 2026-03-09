// ARRAY DE ARMAS
const armas = ["Espada", "Arco", "Daga", "Martillo"];
const precios = [500, 350, 200, 700];

// VARIABLE TOTAL DE ORO GASTADO
let oroGastado = 0;


// FUNCION 1: mostrar armas disponibles
function mostrarArmas() {

    let lista = "Armas disponibles en la tienda:\n";

    for (let i = 0; i < armas.length; i++) {

        lista += i + " - " + armas[i] + " (" + precios[i] + " de oro)\n";

    }

    alert(lista);
}


// FUNCION 2: elegir arma
function elegirArma() {

    let opcion = prompt("Ingresa el número del arma que deseas comprar:");

    if (opcion >= 0 && opcion < armas.length) {

        oroGastado = oroGastado + precios[opcion];

        alert(
        "Compraste: " + armas[opcion] +
        "\nCosto: " + precios[opcion] + " de oro" +
        "\nOro gastado hasta ahora: " + oroGastado
        );

    } else {

        alert("No existe esa arma en la tienda.");

    }
}


// FUNCION 3: mostrar total gastado
function mostrarResumen() {

    alert("Terminaste tu compra.\nTotal de oro gastado: " + oroGastado);

    console.log("Total de oro gastado:", oroGastado);
}



// PROGRAMA PRINCIPAL

alert("Bienvenido a la tienda de armas del reino");

let seguirComprando = true;

while (seguirComprando) {

    mostrarArmas();

    elegirArma();

    seguirComprando = confirm("¿Quieres comprar otra arma?");
}

mostrarResumen();