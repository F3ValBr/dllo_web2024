from flask import Flask, request, render_template, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from db import db
import utils.validations as utval
import utils.helpers as uthelp
import filetype
import hashlib
import json
import os

UPLOAD_FOLDER = 'static/resources/img/uploads/originales'

app = Flask(__name__)

app.secret_key = "pr0gr4m4c10nw3b"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB

@app.errorhandler(413)
def request_entity_too_large(error):
    return 'File exceeds the maximum file size allowed', 413


# --- Rutas ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/agregar-producto', methods=['GET', 'POST'])
def agregar_producto():
    if request.method == 'GET':
        regiones = db.get_regions()
        return render_template('agregar-producto.html', regiones=regiones)
    elif request.method == 'POST':
        prod_elegido = request.form['choose-product']
        prods_seleccionados = request.form.getlist('productos[]')
        descripcion = request.form.get('descripcion', '')
        region_id = request.form['selectorRegion']
        comuna_id = request.form['selectorComuna']
        nombre = request.form['nombre']
        correo = request.form['email']
        telefono = request.form.get('phone', '')
        fotos = request.files.getlist('fotos[]')

        # validadores de datos
        contacto_ok = utval.validate_contact_data(nombre, correo, telefono)
        lugar_ok = utval.validate_region_comuna(region_id, comuna_id)
        producto_ok = utval.validate_product_type(prod_elegido)
        descripcion_ok = utval.validate_descripcion(descripcion)
        prods_seleccionados_ok = utval.validate_products(prods_seleccionados)
        fotos_ok = utval.validate_all_imgs(fotos)

        if contacto_ok and lugar_ok and producto_ok and descripcion_ok and prods_seleccionados_ok and fotos_ok:
            # guardar las fotos
            fotos_nombres = []
            for foto in fotos:
                _filename = hashlib.sha256(
                    secure_filename(foto.filename) # nombre del archivo
                    .encode("utf-8") # encodear a bytes
                    ).hexdigest()
                _extension = filetype.guess(foto).extension
                img_filename = f"{_filename}.{_extension}"

                foto.save(os.path.join(app.config['UPLOAD_FOLDER'], img_filename))

                fotos_nombres.append(img_filename)
                
            # guardar en la base de datos
            # insertar el producto
            id_producto = db.insertar_producto(
                prod_elegido,
                descripcion,
                comuna_id,
                nombre,
                correo,
                telefono
            )
            # insertar los productos seleccionados
            for id_prod in prods_seleccionados:
                db.insertar_producto_fruta_verdura(id_producto, id_prod)
            # insertar las fotos
            for foto in fotos_nombres:
                paths_recuperados = uthelp.take_and_convert(foto)
                for path in paths_recuperados:
                    db.insertar_foto(path, foto, id_producto)

            return jsonify({'success': True, 'message': 'Hemos recibido el registro de producto. Muchas gracias.'}), 200
        else:
            errores = uthelp.errores_handler(contacto_ok, lugar_ok, producto_ok, descripcion_ok, prods_seleccionados_ok, fotos_ok)
            mensaje_error = " ".join(errores)
            return jsonify({'success': False, 'message': mensaje_error}), 400
        

@app.route('/obtener-comunas/<int:region_id>')
def obtener_comunas(region_id):
    comunasObt = db.get_comunas_by_region(region_id)
    comunas = []
    for comuna in comunasObt:
        comunas.append({
            "id": comuna[0],
            "nombre": comuna[1]
        })
    return json.dumps(comunas)

@app.route('/obtener-frutas')
def obtener_frutas():
    frutas = db.get_frutas()
    return json.dumps(frutas)

@app.route('/obtener-verduras')
def obtener_verduras():
    verduras = db.get_verduras()
    return json.dumps(verduras)

# --- Rutas a ver productos ---
@app.route('/ver-productos', methods=['GET'])
def ver_productos():
    pagina = request.args.get('pagina', 1, type=int)
    offset = (pagina - 1) * 5

    prods_pagina = db.get_productos_de_a_5(offset)

    data = []
    for producto in prods_pagina:
        id, tipo, _, comuna_id, _, _, _ = producto
        tipo = tipo.capitalize()
        lugar = db.get_location_by_id_com(comuna_id)
        comuna, region = lugar[0], lugar[1]
        productos = []
        for prod in db.get_prod_verdura_fruta_by_producto_id(id):
            productos.append(prod[0])
        fotos = []
        for foto in db.get_fotos_by_producto_id_y_ruta(id, '120_120_formato'):
            ruta_archivo = foto[0]
            nombre_archivo = foto[1]
            fotos.append(ruta_archivo + nombre_archivo)
        
        data.append({
            'id': id,
            'tipo': tipo,
            'comuna': comuna,
            'region': region,
            'productos': productos,
            'fotos': fotos
        })

    total_productos = db.contador_productos()
    total_productos = int(total_productos[0])
    print(total_productos)
    total_pags = (total_productos + 4) // 5
    return render_template('ver-productos.html', data = data, pagina = pagina, total_pags = total_pags)

@app.route('/informacion-producto/<int:id>', methods=['GET'])
def informacion_producto(id):
    producto = db.get_producto_by_id(id)
    _, tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor = producto[0]
    tipo = tipo.capitalize()
    lugar = db.get_location_by_id_com(comuna_id)
    comuna, region = lugar[0], lugar[1]
    productos = []
    for prod in db.get_prod_verdura_fruta_by_producto_id(id):
        productos.append(prod[0])
    fotos_640_480 = []
    for foto in db.get_fotos_by_producto_id_y_ruta(id, '640_480_formato'):
        ruta_archivo = foto[0]
        nombre_archivo = foto[1]
        fotos_640_480.append(ruta_archivo + nombre_archivo)
    fotos_1280_1024 = []
    for foto in db.get_fotos_by_producto_id_y_ruta(id, '1280_1024_formato'):
        ruta_archivo = foto[0]
        nombre_archivo = foto[1]
        fotos_1280_1024.append(ruta_archivo + nombre_archivo)
    
    # crear lista de data con todos los datos
    data = {
        'tipo': tipo,
        'productos': productos,
        'descripcion': descripcion,
        'fotos_640_480': fotos_640_480,
        'fotos_1280_1024': fotos_1280_1024,
        'comuna': comuna,
        'region': region,
        'nombre_productor': nombre_productor,
        'email_productor': email_productor,
        'celular_productor': celular_productor
    }
    return render_template('informacion-producto.html', data = data)

@app.route('/agregar-pedido')
def agregar_pedido():
    return render_template('agregar-pedido.html')

@app.route('/ver-pedidos')
def ver_pedidos():
    return render_template('ver-pedidos.html')

if __name__ == "__main__":
    app.run(debug=True)