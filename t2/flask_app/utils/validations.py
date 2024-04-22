import re
import filetype
from db import db

# validar el nombre
def validate_nombre(value):
    return value and len(value) >= 3 and len(value) <= 80

# validar el correo
def validate_correo(value):
    if "@" in value and len(value) <= 30:
        parts = value.split("@")
        local = parts[0]
        domain = parts[1]
        parts_domain = domain.split(".")
        after_dot = parts_domain[1]
        before_dot = parts_domain[0]
        return len(local) >= 3 and len(domain) >= 4 and "." in domain and len(after_dot) >= 2 and len(before_dot) >= 1
    return False

# validar el telefono
def validate_telefono(value):
    if not value.strip():
        return True
    phone_regex = re.compile(r'^\+?\d{1,3}?[-. ]?\(?\d{2,3}\)?[-. ]?\d{3}[-. ]?\d{4}$')
    return bool(phone_regex.match(value))

# validar la descripcion
def validate_descripcion(descripcion):
    # Primero, verifica si la descripción está vacía después de quitar espacios en blanco
    if not descripcion.strip():
        return True
    # Luego, verifica que la descripción exista y tenga menos de 200 caracteres
    return descripcion is not None and len(descripcion) < 200

# validar las imagenes
def validate_img(img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png"}

    # check if a file was submitted
    if img is None:
        return False

    # check if the browser submitted an empty file
    if img.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

# validar todas las imagenes
def validate_all_imgs(imgs):
    if not 1 <= len(imgs) <= 3:
        return False
    return all(validate_img(img) for img in imgs)

# validar la region
def validate_region(region_id):
    regions = db.get_regions()
    region_ids = [region[0] for region in regions]
    return region_id in region_ids

# validar la comuna
def validate_comuna(comuna_id):
    comunas = db.get_comunas()
    comuna_ids = [comuna[0] for comuna in comunas]
    return comuna_id in comuna_ids

# validar pertenencia de la comuna a la region
def validate_comuna_region(region_id, comuna_id):
    # convertir a entero
    comunas = db.get_comunas_by_region(region_id)
    comuna_ids = [comuna[0] for comuna in comunas]
    return comuna_id in comuna_ids

# validar si se escogieron frutas o verduras como producto
def validate_products(products):
    # convertir lista a enteros
    products = [int(product) for product in products]

    if not 1 <= len(products) <= 5:
        return False

    frutas = db.get_frutas()
    verduras = db.get_verduras()
    
    # Crear un único conjunto con todos los IDs válidos para mejorar la eficiencia
    valid_ids = set(fruta[0] for fruta in frutas) | set(verdura[0] for verdura in verduras)
    
    # Comprobar que cada producto esté en el conjunto de IDs válidos
    return all(product in valid_ids for product in products)

# validar el tipo de producto
def validate_product_type(product):
    return product == "fruta" or product == "verdura"

# validar los datos de contacto
def validate_contact_data(nombre, correo, telefono):
    return validate_nombre(nombre) and validate_correo(correo) and validate_telefono(telefono)

# validar region y comuna
def validate_region_comuna(region_id, comuna_id):
    # convertir a entero
    region_id = int(region_id)
    comuna_id = int(comuna_id)
    return validate_region(region_id) and validate_comuna(comuna_id) and validate_comuna_region(region_id, comuna_id)