const productos = [
{ id: 1, nombre: "Manzanas", precio: 2.50, categoria: "Frutas" },
{ id: 2, nombre: "Leche", precio: 3.20, categoria: "Lácteos" },
{ id: 3, nombre: "Pan", precio: 1.80, categoria: "Panadería" },
{ id: 4, nombre: "Queso", precio: 5.00, categoria: "Lácteos" },
{ id: 5, nombre: "Tomates", precio: 2.00, categoria: "Verduras" },
{ id: 6, nombre: "Huevos", precio: 4.50, categoria: "Lácteos" },
{ id: 7, nombre: "Arroz", precio: 3.00, categoria: "Granos" },
{ id: 8, nombre: "Aceite", precio: 6.00, categoria: "Aceites" },
{ id: 9, nombre: "Yogur", precio: 2.99, categoria: "Lácteos" },
{ id: 10, nombre: "Atún en Lata", precio: 2.30, categoria: "Enlatados" },
{ id: 11, nombre: "Cereal", precio: 4.00, categoria: "Desayuno" },
{ id: 12, nombre: "Café", precio: 5.50, categoria: "Bebidas" },
{ id: 13, nombre: "Té", precio: 3.75, categoria: "Bebidas" },
{ id: 14, nombre: "Galletas", precio: 2.20, categoria: "Snacks" },
{ id: 15, nombre: "Chocolate", precio: 3.00, categoria: "Dulces" }
];

let carrito = [];

function mostrarProductos() {
    const productoslista = document.getElementById("productosLista");
    productoslista.innerHTML = "";

    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.className = "producto-card";
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p class="categoria">${producto.categoria}</p>
            <p class="precio">$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productoslista.appendChild(productoDiv);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemCarrito = carrito.find(item => item.id === id);

    if (itemCarrito) {
        itemCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    mostrarCarrito();
}
function mostrarCarrito() {
    const carritoLista = document.getElementById("carritoLista");
    carritoLista.innerHTML = "";

    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "carrito-item";
        itemDiv.innerHTML = `
            <h3>${item.nombre}</h3>
            <p class="cantidad">Cantidad: ${item.cantidad}</p>
            <p class="subtotal">Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoLista.appendChild(itemDiv);
    });
}
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  mostrarCarrito();
}


function actualizarTotales() {
  const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  
  document.getElementById("totalCantidad").textContent = totalCantidad;
  document.getElementById("totalPrecio").textContent = totalPrecio.toFixed(2);
}

document.getElementById("limpiarCarrito").addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

document.addEventListener("DOMContentLoaded", mostrarProductos);