// Funcion para mostrar la imagen en un modal dentro de la informacion del producto

function abrirModal(img) {
    // Obtener el modal
    var modal = document.getElementById("miModal");
    var modalImg = document.getElementById("img-prod");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerHTML = img.alt;

    // Obtener el elemento <span> que cierra el modal
    var span = document.getElementsByClassName("cerrar")[0];

    // Cuando el usuario hace clic en <span> (x), cierra el modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
}
