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

const validarFotos = () => {
    const fotosInput = document.getElementById('contenedorFotos').querySelectorAll('input[type="file"]');
    const numeroDeFotos = fotosInput.length;
    let fotosVacias = 0;

    fotosInput.forEach(function(input) {
        if (input.files.length === 0) {
            fotosVacias += 1;
        }
    });

    // Validar que al menos 1 foto ha sido seleccionada y no más de 3
    if (fotosVacias === numeroDeFotos) {
        //alert('Por favor, selecciona al menos una foto.');
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
};

const validarNoMasDeTresFotos = () => {
    const fotosInput = document.getElementById('contenedorFotos').querySelectorAll('input[type="file"]');
    const numeroDeFotos = fotosInput.length;

    if (numeroDeFotos < 1 || numeroDeFotos > 3) {
        //alert('Por favor, selecciona entre 1 y 3 fotos.');
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
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

// --- Data relevante para el formulario ---

let frutas = [
    "Arándano", "Frambuesa", "Frutilla", "Grosella", "Mora", "Limón", "Mandarina", "Naranja", "Pomelo", 
    "Melón", "Sandía", "Palta", "Chirimoya", "Coco", "Dátil", "Kiwi", "Mango", "Papaya", "Piña", "Plátano", 
    "Damasco", "Cereza", "Ciruela", "Higo", "Kaki", "Manzana", "Durazno", "Nectarin", "Níspero", "Pera",
    "Uva", "Almendra", "Avellana", "Maní", "Castaña", "Nuez", "Pistacho"
];
frutas = frutas.sort();
let verduras = [
    "Brócoli", "Repollo", "Coliflor", "Rábano", "Alcachofa", "Lechuga", "Zapallo", "Pepino", "Haba", "Maíz", 
    "Champiñón", "Apio", "Espinaca", "Perejil", "Ajo", "Cebolla", "Espárrago", "Puerro", "Acelga", "Remolacha", 
    "Berenjena", "Papa", "Pimiento", "Tomate", "Zanahoria"
];
verduras = verduras.sort();

const datosRegionComuna = [
    {
        "region": "Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
        "region": "Tarapacá",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
    {
        "region": "Antofagasta",
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },
    {
        "region": "Atacama",
        "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
    {
        "region": "Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
    },
    {
        "region": "Valparaíso",
        "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
    },
    {
        "region": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
    {
        "region": "Región del Maule",
        "comunas": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
    {
        "region": "Región de Ñuble",
        "comunas": ["Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ránquil", "Treguaco", "Bulnes", "Chillán Viejo", "Chillán", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Coihueco", "Ñiquén", "San Carlos", "San Fabián", "San Nicolás"]
    },
    {
        "region": "Región del Biobío",
        "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"]
    },
    {
        "region": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]
    },
    {
        "region": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
    },
    {
        "region": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
    },
    {
        "region": "Región Aisén del Gral. Carlos Ibáñez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
    },
    {
        "region": "Región de Magallanes y de la Antártica Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    },
    {
        "region": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
     }
]

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
    let prodElect = tipo === "frutas" ? frutas : verduras;
    
    // Limpieza de los checkboxes anteriores (si los hay)
    while (productosCheckboxContainer.firstChild) {
        productosCheckboxContainer.removeChild(productosCheckboxContainer.firstChild);
    }

    // Creación de los checkboxes de productos según el tipo seleccionado
    prodElect.forEach((producto, index) => {
        const checkboxContainer = document.createElement("div");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");

        const labelProductosContainer = document.getElementById('labelProductosContainer');

        // Muestra el label "Productos:" solo si se selecciona "frutas" o "verduras"
        labelProductosContainer.style.display = tipo ? 'block' : 'none';

        checkbox.type = "checkbox";
        checkbox.id = `prod-${index}`;
        checkbox.name = "productos";
        checkbox.value = producto.toLowerCase();
        
        label.htmlFor = `prod-${index}`;
        label.textContent = producto;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        productosCheckboxContainer.appendChild(checkboxContainer);

        // Añadir un escuchador de eventos para limitar a 5 selecciones
        checkbox.addEventListener('change', limitarCheckbox);
    });
};

tipoProdSelect.addEventListener("change", selectTipoProd);
//------------------------------------------------------------

const agregarFotoProducto = () => {
    const contenedorFotos = document.getElementById('contenedorFotos');
    const numeroDeFotos = contenedorFotos.querySelectorAll('input[type="file"]').length;

    // Solo añadir nuevos campos si hay menos de 3
    if (numeroDeFotos < 3) {
        const nuevoCampo = document.createElement('input');
        nuevoCampo.type = 'file';
        nuevoCampo.name = 'foto' + (numeroDeFotos + 1);
        nuevoCampo.accept = 'image/*';
        nuevoCampo.onchange = agregarFotoProducto;

        contenedorFotos.appendChild(nuevoCampo);
    }
}

// Función para limpiar las opciones de un selector
const limpiarSelector = (selector) => {
    while (selector.options.length > 1) {
        selector.remove(1);
    }
}

// Llenar el selector de regiones
datosRegionComuna.forEach(region => {
    let opcion = new Option(region.region, region.region);
    selectorRegion.add(opcion);
});

// Manejador de eventos para cuando cambie la selección de región
const seleccionComunasPorRegion = () => {
    // Limpiar las comunas existentes
    limpiarSelector(selectorComuna);

    // Encuentra las comunas de la región seleccionada
    let regionSeleccionada = selectorRegion.value;
    let comunas = datosRegionComuna.find(region => region.region === regionSeleccionada)?.comunas || [];

    // Llenar el selector de comunas
    comunas.forEach(comuna => {
        let opcion = new Option(comuna, comuna);
        selectorComuna.add(opcion);
    });
}

selectorRegion.addEventListener('change', seleccionComunasPorRegion);

const handleFormSubmit = (event) => {
    console.log('Validando formulario...');

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
    }

    if (!validarFotos()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona al menos una foto.\n';
    }

    if (!validateDescription(descripcionInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa una descripción válida (menos de 200 caracteres).\n';
    }

    if (!validarNoMasDeTresFotos()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona entre 1 y 3 fotos.\n';
    }

    if (!validarRegion()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona una región.\n';
    }

    if (!validarComuna()) {
        isValid = false;
        errorMessage += 'Por favor, selecciona una comuna.\n';
    }

    if (!validateName(nombreInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un nombre válido (3 caracteres mínimo).\n';
    }

    if (!validateEmail(emailInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un correo electrónico válido.\n';
    }

    if (!validatePhone(telefonoInput.value)) {
        isValid = false;
        errorMessage += 'Por favor, ingresa un número de teléfono válido.\n';
    }    

    // Manejar errores o redirigir a la página de confesiones
    if (!isValid) {
        // Configura el mensaje de error en el modal en lugar de usar alert()
        textoEnModal.innerText = errorMessage.replace(/\n/g, "\n\n");
        modalBotonCerrar.innerText = 'Volver al formulario';
        modalHTML.style.display = 'block';
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
    window.location.href = '../html/index.html';
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
    mostrarMensajeDeExito();
});

document.getElementById('cancelarRegistro').addEventListener('click', function() {
    // Simplemente cierra el modal y permite al usuario ajustar el formulario como desee
    document.getElementById('modalConfirmacion').style.display = 'none';
});

// Manejador de eventos para el envío del formulario

const checkFormulario = document.getElementById('envio');
checkFormulario.addEventListener('click', handleFormSubmit);

