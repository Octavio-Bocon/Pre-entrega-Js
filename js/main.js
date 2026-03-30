// ARRAY DE OBJETOS
const armas = [
    { id: 1, nombre: "Espada", precio: 500 },
    { id: 2, nombre: "Arco", precio: 350 },
    { id: 3, nombre: "Daga", precio: 200 },
    { id: 4, nombre: "Martillo", precio: 700 }
];

// CARRITO CON LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// MENSAJE EN PANTALLA
function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = texto;

    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}

// MOSTRAR ARMAS
function mostrarArmas() {

    const contenedor = document.getElementById("contenedor-armas");

    armas.forEach(arma => {

        const div = document.createElement("div");

        div.innerHTML = `
            <p><strong>${arma.nombre}</strong> - ${arma.precio} oro</p>
            <button data-id="${arma.id}">Comprar</button>
        `;

        contenedor.appendChild(div);
    });

    // EVENTOS A BOTONES
    document.querySelectorAll("button[data-id]").forEach(boton => {
        boton.addEventListener("click", (e) => {
            agregarAlCarrito(parseInt(e.target.dataset.id));
        });
    });
}

// AGREGAR AL CARRITO
function agregarAlCarrito(id) {

    const arma = armas.find(a => a.id === id);

    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...arma, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("Agregaste " + arma.nombre);
    mostrarCarrito();
}

// MOSTRAR CARRITO
function mostrarCarrito() {

    const lista = document.getElementById("carrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.nombre} x${item.cantidad} - ${item.precio * item.cantidad} oro
            <button onclick="eliminarItem(${item.id})">❌</button>
        `;

        lista.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalSpan.textContent = total;
}

// ELIMINAR ITEM
function eliminarItem(id) {

    carrito = carrito.filter(item => item.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

// VACIAR CARRITO
document.getElementById("vaciar").addEventListener("click", () => {

    carrito = [];
    localStorage.removeItem("carrito");

    mostrarMensaje("Carrito vaciado");
    mostrarCarrito();
});

// INICIO
mostrarArmas();
mostrarCarrito();