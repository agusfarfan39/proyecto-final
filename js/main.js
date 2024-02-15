let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })




const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesComprar = document.querySelectorAll(".producto-comprar");


function cargarProductos() {

    productos.forEach(producto => {

        const div = document.createElement("div");

        div.classList.add("producto");
        div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-info">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-comprar" id= "${producto.id}">COMPRAR</button>
                    </div>
        `;

        contenedorProductos.append(div);
    })


    actualizarBotonesComprar();
    console.log(botonesComprar);
}

cargarProductos();




function actualizarBotonesComprar() {

    botonesComprar = document.querySelectorAll(".producto-comprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosCarrito;
const productosCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (productosCarritoLS) {
    productosCarrito = productosCarritoLS;
} else {
    productosCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));

}



