const contenedor = document.getElementById("contenedor-carrito");
const totalFinal = document.getElementById("total-final");
const btnVaciar = document.getElementById("btn-vaciar");
const btnFinalizar = document.getElementById("btn-finalizar");

// Recuperar carrito del Storage
let carrito = JSON.parse(localStorage.getItem("carrito-bnz")) || [];

const renderizarCarrito = () => {
    contenedor.innerHTML = "";
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="text-center p-5 text-muted">No seleccionaste repuestos todavía.</p>`;
        totalFinal.innerText = "0";
        return;
    }

    carrito.forEach((prod, index) => {
        const item = document.createElement("article");
        item.classList.add("carrito-item", "mb-4", "p-3", "bg-white", "rounded", "shadow-sm");
        item.innerHTML = `
            <div class="row align-items-center">
                <div class="col-8">
                    <h2 class="h5 mb-1">${prod.nombre}</h2>
                    <p class="mb-0 text-muted">Repuesto Renault / Multimarca</p>
                </div>
                <div class="col-4 text-end">
                    <p class="mb-1 fw-bold">$${prod.precio.toLocaleString()}</p>
                    <button class="btn btn-sm text-danger border-0" onclick="eliminarDelCarrito(${index})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(item);
    });

    // Calcular el total
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    totalFinal.innerText = total.toLocaleString();
};

// Función para eliminar un solo item
window.eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito-bnz", JSON.stringify(carrito));
    renderizarCarrito();
};

// Función para vaciar todo
btnVaciar.addEventListener("click", () => {
    if (carrito.length > 0) {
        carrito = [];
        localStorage.removeItem("carrito-bnz");
        renderizarCarrito();
    }
});

// Finalizar compra con SweetAlert2
btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agregá productos antes de finalizar', 'warning');
        return;
    }

    Swal.fire({
        title: '¿Confirmar pedido?',
        text: "Recibirás un presupuesto formal en minutos.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#674774',
        confirmButtonText: 'Sí, enviar pedido',
        cancelButtonText: 'Seguir comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('¡Enviado!', 'Tu pedido de BNZ Repuestos fue procesado.', 'success');
            carrito = [];
            localStorage.removeItem("carrito-bnz");
            renderizarCarrito();
        }
    });
});

renderizarCarrito();