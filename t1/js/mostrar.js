/** 
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('#productosTable tr[data-href]');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            window.location.href = row.dataset.href;
        });
    });
});
*/

const tablaProductos = document.querySelectorAll('#productosTable tr[data-href]');

tablaProductos.forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = row.dataset.href;
    });
}
);
