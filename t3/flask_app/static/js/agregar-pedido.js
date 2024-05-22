// Validadores del formulario

const validateDescription = description => {
    if (description.trim() === '') {
        return true;
    }
    return description && description.length < 200;
};

const validateName = name => name && name.length > 3 && name.length < 80;

const validateEmail = email => {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = phone => {
    if (phone.trim() === '') {
        return true;
    }
    const phoneRegex = /^\+?\d{1,3}?[-. ]?\(?\d{2,3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    return phoneRegex.test(phone);
};

const validarSeleccion = () => {
    const checkedCheckboxes = productosCheckboxContainer.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedCheckboxes.length === 0) {
        //alert("Por favor, selecciona al menos una fruta o verdura.");
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
}

const limitarCheckbox = (evento) => {
    let checkedCheckboxes = productosCheckboxContainer.querySelectorAll('input[type="checkbox"]:checked');
    const textoModal = document.getElementById("textoModal"); 
    const modal = document.getElementById("modalModificable");

    if (checkedCheckboxes.length > 5) {
        evento.target.checked = false;
        // Configura el mensaje de error en el modal en lugar de usar alert()
        textoModal.innerText = "Solo puedes seleccionar un máximo de 5 productos.";
        // Muestra el modal
        modal.style.display = 'block';
    }
};

const validarRegion = () => {
    const region = selectorRegion;
    if (!region || region.value === "") {
        //alert('Por favor, selecciona una región.');
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
};

const validarComuna = () => {
    const comuna = selectorComuna;
    if (!comuna || comuna.value === "") {
        //alert('Por favor, selecciona una comuna.');
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
};

// --- Funciones para alterar el HTML ---

// Obtención de elementos del DOM
const tipoProdSelect = document.getElementById("choose-product");
const productSelect = document.getElementById("productos");
const productosCheckboxContainer = document.getElementById("productosCheckboxContainer");
const selectorRegion = document.getElementById('selectorRegion');
const selectorComuna = document.getElementById('selectorComuna');

// Llenar el selector de productos dependiendo del tipo de producto seleccionado
const selectTipoProd = (event) => {
    const tipo = event.target.value;
    let prodElect = tipo === "fruta" ? '/obtener-frutas' : '/obtener-verduras';
    
    // Limpieza de los checkboxes anteriores (si los hay)
    while (productosCheckboxContainer.firstChild) {
        productosCheckboxContainer.removeChild(productosCheckboxContainer.firstChild);
    }

    // Creación de los checkboxes de productos según el tipo seleccionado
    fetch(prodElect)
        .then(response => response.json())
        .then(pedidos => {
            // Creación de los checkboxes de pedidos según el tipo seleccionado
            pedidos.forEach(pedido => {
                const checkboxContainer = document.createElement("div");
                const checkbox = document.createElement("input");
                const label = document.createElement("label");

                const labelProductosContainer = document.getElementById('labelProductosContainer');

                // Muestra el label "Pedidos:" solo si se selecciona "frutas" o "verduras"
                labelProductosContainer.style.display = tipo ? 'block' : 'none';

                checkbox.type = "checkbox";
                checkbox.id = pedido[1];
                checkbox.name = "pedidos[]";
                checkbox.value = pedido[0];
                
                label.htmlFor = pedido[0];
                label.textContent = pedido[1];

                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(label);
                productosCheckboxContainer.appendChild(checkboxContainer);

                // Añadir un escuchador de eventos para limitar a 5 selecciones
                checkbox.addEventListener('change', limitarCheckbox);
            });
        });
};

tipoProdSelect.addEventListener("change", selectTipoProd);
//-------


// Función para limpiar las opciones de un selector
const limpiarSelector = (selector) => {
    while (selector.options.length > 1) {
        selector.remove(1);
    }
}

// Manejador de eventos para cuando cambie la selección de región
const actualizarComunas = () => {
    // Limpiar las comunas existentes
    limpiarSelector(selectorComuna);

    let regionSeleccionada = selectorRegion.value;

    fetch(`/obtener-comunas/${regionSeleccionada}`).
    then(response => response.json())
    .then(comunas => {
        comunas.forEach(comuna => {
            let opcion = new Option(comuna["nombre"], comuna["id"]);
            selectorComuna.add(opcion);
        });
    });
}

selectorRegion.addEventListener('change', actualizarComunas);

const handleFormSubmit = (event) => {
    console.log('Validando formulario...');

    // Obtiene los campos del formulario
    const elegirProductoInput = document.getElementById('choose-product');
    const regionInput = document.getElementById('selectorRegion');
    const comunaInput = document.getElementById('selectorComuna');

    const descripcionInput = document.getElementById('descripcion');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('phone');
    const textoEnModal = document.getElementById('textoModal');
    const modalHTML = document.getElementById('modalModificable');
    const modalBotonCerrar = document.getElementById('cerrarModal');

    let isValid = true;
    let errorMessage = '';

    // Validar los campos del formulario
    if (!validarSeleccion()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona al menos una fruta o verdura.\n';
        elegirProductoInput.style.borderColor = "red";
    } else {
        elegirProductoInput.style.borderColor = "";
    }

    if (!validateDescription(descripcionInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa una descripción válida (menos de 200 caracteres).\n';
        descripcionInput.style.borderColor = "red";
    } else {
        descripcionInput.style.borderColor = "";
    }

    if (!validarRegion()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona una región.\n';
        regionInput.style.borderColor = "red";
    } else {
        regionInput.style.borderColor = "";
    }

    if (!validarComuna()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona una comuna.\n';
        comunaInput.style.borderColor = "red";
    } else {
        comunaInput.style.borderColor = "";
    }

    if (!validateName(nombreInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un nombre válido (3 caracteres mínimo).\n';
        nombreInput.style.borderColor = "red";
    } else {
        nombreInput.style.borderColor = "";
    }

    if (!validateEmail(emailInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un correo electrónico válido.\n';
        emailInput.style.borderColor = "red";
    } else {
        emailInput.style.borderColor = "";
    }

    if (!validatePhone(telefonoInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un número de teléfono válido.\n';
        telefonoInput.style.borderColor = "red";
    } else {
        telefonoInput.style.borderColor = "";
    } 

    // Manejar errores o redirigir a la página de confesiones
    if (!isValid) {
        textoEnModal.innerText = errorMessage.replace(/\n/g, "\n\n");
        modalBotonCerrar.innerText = 'Volver al formulario';
        modalHTML.style.display = 'block';
        //alert(errorMessage); // Reemplazar con un mensaje de error más amigable
        return; // Indica que la validación falló
    } else {
        document.getElementById('modalConfirmacion').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    var btnCerrar = document.getElementById('cerrarModal');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            document.getElementById('modalModificable').style.display = 'none';
        });
    }
});

const modalBotonCerrarHandler = () => {
    window.location.href = '/';
};

function mostrarMensajeDeExito() {
    // Cierra el modal de confirmación
    document.getElementById('modalConfirmacion').style.display = 'none';

    // Obtiene el modal de éxito y su botón de cerrar
    const modalHTML = document.getElementById('modalRedireccion');
    const modalBotonCerrar = document.getElementById('cerrarModalRedireccion');

    // Muestra el modal de éxito
    modalHTML.style.display = 'block';

    // Crea el listener del boton para volver a la portada
    modalBotonCerrar.removeEventListener('click', modalBotonCerrarHandler);

    modalBotonCerrar.addEventListener('click', modalBotonCerrarHandler);
}

document.getElementById('confirmarRegistro').addEventListener('click', function() {
    // Aquí se puede enviar el formulario a un servidor o realizar cualquier otra acción necesaria
    //document.getElementById('producto-form').submit();
    //mostrarMensajeDeExito();

    var formulario = document.getElementById('pedido-form');
    var datosFormulario = new FormData(formulario);

    fetch(formulario.action, {
        method: 'POST',
        body: datosFormulario,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Si el servidor devuelve éxito, muestra el modal de éxito
            document.getElementById('textoModalRedireccion').innerText = data.message; // Asegúrate de que este es el ID correcto
            mostrarMensajeDeExito(); // Esta función muestra el modal de éxito y debería configurar la redirección
        } else {
            // Si el servidor devuelve un error, muestra el mensaje en el modal de error
            document.getElementById('modalConfirmacion').style.display = 'none';
            document.getElementById('textoModal').innerText = data.message;
            document.getElementById('modalModificable').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('cancelarRegistro').addEventListener('click', function() {
    // Simplemente cierra el modal y permite al usuario ajustar el formulario como desee
    document.getElementById('modalConfirmacion').style.display = 'none';
});

// Manejador de eventos para el envío del formulario

const checkFormulario = document.getElementById('envio');
checkFormulario.addEventListener('click', handleFormSubmit);