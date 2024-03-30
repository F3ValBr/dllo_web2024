// --- Redireccionador del index ---
/** 
document.addEventListener('DOMContentLoaded', (event) => {
    const botones = document.querySelectorAll('.button');

    function redireccionar(pag) {
        window.location.href = pag;
    }

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const pag = boton.id;
            redireccionar(pag + '.html');
        });
    });
});
*/
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


