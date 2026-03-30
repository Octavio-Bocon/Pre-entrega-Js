// ARMAS
const armas = [
    { id: 1, nombre: "Espada", precio: 500 },
    { id: 2, nombre: "Arco", precio: 350 },
    { id: 3, nombre: "Daga", precio: 200 },
    { id: 4, nombre: "Martillo", precio: 700 }
];

// ESTADO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let oro = 2000;


// MENSAJE FADE
function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = texto;
    mensaje.style.opacity = 1;

    setTimeout(() => {
        mensaje.style.opacity = 0;
    }, 2000);
}


// MOSTRAR ARMAS
function mostrarArmas() {

    const contenedor = document.getElementById("contenedor-armas");

    armas.forEach(arma => {

        const div = document.createElement("div");

        div.style.animationDelay = `${arma.id * 0.1}s`;

        div.innerHTML = `
            <p><strong>${arma.nombre}</strong></p>
            <p>${arma.precio} oro 🪙</p>
            <button data-id="${arma.id}">Comprar</button>
        `;

        contenedor.appendChild(div);
    });

    document.querySelectorAll("button[data-id]").forEach(boton => {
        boton.addEventListener("click", (e) => {
            agregarAlCarrito(parseInt(e.target.dataset.id));
        });
    });
}


// AGREGAR AL CARRITO
function agregarAlCarrito(id) {

    const arma = armas.find(a => a.id === id);

    if (oro < arma.precio) {
        mostrarMensaje("❌ No tenés suficiente oro");
        return;
    }

    oro -= arma.precio;
    document.getElementById("oro").textContent = oro;

    const existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...arma, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarMensaje("⚔️ Compraste " + arma.nombre);
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
            ${item.nombre} x${item.cantidad} - ${item.precio * item.cantidad} oro 🪙
            <button onclick="eliminarItem(${item.id})">❌</button>
        `;

        lista.appendChild(li);

        total += item.precio * item.cantidad;
    });

    totalSpan.textContent = total;
}


// ELIMINAR ITEM
function eliminarItem(id) {

    const item = carrito.find(p => p.id === id);

    if (item) {
        oro += item.precio * item.cantidad;
        document.getElementById("oro").textContent = oro;
    }

    carrito = carrito.filter(item => item.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}


// VACIAR CARRITO
document.getElementById("vaciar").addEventListener("click", () => {

    carrito.forEach(item => {
        oro += item.precio * item.cantidad;
    });

    carrito = [];
    localStorage.removeItem("carrito");

    document.getElementById("oro").textContent = oro;

    mostrarMensaje("🧹 Carrito vaciado");
    mostrarCarrito();
});


// FINALIZAR COMPRA
document.getElementById("finalizar").addEventListener("click", () => {

    if (carrito.length === 0) {
        mostrarMensaje("⚠️ Tu carrito está vacío");
        return;
    }

    let resumen = "🧾 Compra realizada:\n\n";

    carrito.forEach(item => {
        resumen += `${item.nombre} x${item.cantidad}\n`;
    });

    resumen += "\n🪙 Oro restante: " + oro;

    alert(resumen);

    carrito = [];
    localStorage.removeItem("carrito");

    mostrarCarrito();
});


// INICIO
document.getElementById("oro").textContent = oro;

mostrarArmas();
mostrarCarrito();