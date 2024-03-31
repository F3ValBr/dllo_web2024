// --- Redireccionador del index ---

const botones = document.querySelectorAll('.button');

function redireccionar(pag) {
    window.location.href = pag + '.html';
}

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        const pag = boton.id;
        redireccionar(pag);
    });
});


