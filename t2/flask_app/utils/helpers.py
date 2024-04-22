from werkzeug.utils import secure_filename
from PIL import Image
import filetype
import hashlib
import json
import os

path = 'static/resources/img/uploads/'

# funcion que toma una imagen, su ancho y alto y convierte la imagen a un 
# nuevo tamaño guardandolo en el directorio respectivo
def convertir_imagen_y_guardar(img, width, height):
    # abrir la imagen
    imgObt = Image.open(path + 'originales/' + img)
    # redimensionar la imagen
    imgObt = imgObt.resize((width, height))
    # string del path de los elementos cambiados
    path_tam = path + str(width) + '_' + str(height) + '_formato/'
    # crear el directorio si no existe
    if not os.path.exists(path_tam):
        os.makedirs(path_tam)
    # guardar la imagen
    imgObt.save(path_tam + img)
    return path_tam


def take_and_convert(img):
    foto120120 = convertir_imagen_y_guardar(img, 120, 120)
    foto640480 = convertir_imagen_y_guardar(img, 640, 480)
    foto12801024 = convertir_imagen_y_guardar(img, 1280, 1024)
    # crear arreglo con los paths de las imagenes
    lista_paths = [foto120120, foto640480, foto12801024]
    return lista_paths 

def errores_handler(contacto_ok, lugar_ok, producto_ok, descripcion_ok, prods_seleccionados_ok, fotos_ok):
    errores = []
    if not contacto_ok:
        errores.append("Los datos de contacto son inválidos o están incompletos.")
    if not lugar_ok:
        errores.append("La región o comuna seleccionada es inválida.")
    if not producto_ok:
        errores.append("El tipo de producto seleccionado es inválido.")
    if not descripcion_ok:
        errores.append("La descripción del producto es inválida o excede el límite de caracteres.")
    if not prods_seleccionados_ok:
        errores.append("No se seleccionaron productos válidos.")
    if not fotos_ok:
        errores.append("Problema con las fotos subidas. Asegúrate de subir entre 1 y 3 fotos válidas.")
    return errores