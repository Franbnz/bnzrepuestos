// 1. Selección de elementos del DOM
const contenedor = document.querySelector(".productos");

// 2. Variable del carrito (se recupera del LocalStorage si ya existe)
let carrito = JSON.parse(localStorage.getItem("carrito-bnz")) || [];

// 3. Función principal para cargar productos (Fetch + Async/Await)
const cargarProductos = async () => {
    try {
        const response = await fetch('./productos.json');
        const data = await response.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

// 4. Función para inyectar productos en el HTML (DOM)
const renderizarProductos = (productos) => {
    productos.forEach(prod => {
        const article = document.createElement("article");
        article.classList.add("card");
        
        // Estructura idéntica a tu diseño original
        article.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <h2 class="h5">${prod.nombre}</h2>
            <p class="precio">$${prod.precio.toLocaleString()}</p>
            <button class="btn-comprar" id="btn-${prod.id}" style="border:none; cursor:pointer;">
                <i class="fa-solid fa-cart-plus"></i> Seleccionar
            </button>
        `;
        contenedor.appendChild(article);

        // Evento para seleccionar el producto
        const boton = article.querySelector(`#btn-${prod.id}`);
        boton.addEventListener("click", () => {
            seleccionarProducto(prod);
        });
    });
};

// 5. Lógica de selección y guardado (JSON + Storage)
const seleccionarProducto = (producto) => {
    carrito.push(producto);
    
    // Guardamos en LocalStorage para que no se pierda al recargar
    localStorage.setItem("carrito-bnz", JSON.stringify(carrito));

    // Uso de Librería Externa (SweetAlert2)
    Swal.fire({
        title: '¡Seleccionado!',
        text: `${producto.nombre} se añadió a tu lista de cotización.`,
        icon: 'success',
        confirmButtonColor: '#674774',
        timer: 2000,
        showConfirmButton: false
    });
};

// Iniciar la app
cargarProductos();