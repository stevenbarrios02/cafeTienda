
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.querySelectorAll(".btn-agregar").forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);
        const imagen = boton.dataset.imagen;

        const productoExistente = carrito.find(item => item.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1, imagen });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        MySweetAlert({
            title: "Producto agregado",
            text: `${nombre} se añadió al carrito`,
            type: "success",
            imageUrl: imagen,
            confirmText: "OK"
        });
    });
});

if (document.getElementById("carrito-contenido")) {
    const contenedor = document.getElementById("carrito-contenido");
    const totalElemento = document.getElementById("total");

    function mostrarCarrito() {
    contenedor.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        contenedor.innerHTML += `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-img">
                <div class="cart-info">
                    <p>${item.nombre}</p>
                    <span>$${item.precio} x ${item.cantidad}</span>
                </div>
                <button class="btn-eliminar" data-index="${index}">X</button>
            </div>
        `;
    });
    totalElemento.textContent = `Total: $${total}`;

    document.querySelectorAll(".btn-eliminar").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    });
}




    mostrarCarrito();

    document.getElementById("finalizar").addEventListener("click", () => {
    if (carrito.length === 0) {
        MySweetAlert({
            title: "Carrito vacío",
            text: "Agrega productos antes de finalizar la compra",
            type: "warning",
            confirmText: "OK"
        });
        return;
    }

    let imagenesHTML = '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">';
    carrito.forEach(item => {
        imagenesHTML += `
            <div style="text-align:center;">
                <img src="${item.imagen}" style="width:80px;height:80px;border-radius:8px;object-fit:cover;">
                <p style="font-size:14px;margin-top:5px;">${item.nombre} x${item.cantidad}</p>
            </div>
        `;
    });
    imagenesHTML += '</div>';

    MySweetAlert({
        title: "¡Gracias por tu compra!",
        html: imagenesHTML,
        type: "success",
        confirmText: "Cerrar"
    }).then(() => {
        localStorage.removeItem("carrito");
        carrito = [];
        mostrarCarrito();
    });
});
}


