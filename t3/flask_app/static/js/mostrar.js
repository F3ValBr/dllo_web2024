
// --- Redireccionador de la tabla de productos ---

const tablaProductos = document.querySelectorAll('#productosTable tr[data-href]');

tablaProductos.forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = row.dataset.href;
    });
});
