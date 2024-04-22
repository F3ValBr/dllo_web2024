// --- Redireccionador del index ---

const botones = document.querySelectorAll('.button');

function redireccionar(pag) {
    window.location.href = pag;
}

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        const pag = boton.id;
        console.log(pag);
        redireccionar(pag);
    });
});