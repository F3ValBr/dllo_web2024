import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
#DB_USERNAME = "root"
#DB_PASSWORD = "1234567890"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8mb4"

with open("db/db_schema.json") as f:
    QUERY_DICT = json.load(f)

# Función para obtener la conexión a la base de datos

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

# Funciones de querys

def get_location_by_id_com(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_location_by_id_com"], (id,))
    location = cursor.fetchone()
    return location

def get_regions():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_regions"])
	regions = cursor.fetchall()
	return regions

def get_comunas():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comunas"])
	comunas = cursor.fetchall()
	return comunas

def get_comunas_by_region(region_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comunas_by_region_id"], (region_id,))
	comunas = cursor.fetchall()
	return comunas

def get_frutas():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_frutas"])
	frutas = cursor.fetchall()
	return frutas

def get_fruta_verdura_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_fruta_verdura_by_id"], (id,))
	fruta_verdura = cursor.fetchone()
	return fruta_verdura

def get_verduras():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_verduras"])
	verduras = cursor.fetchall()
	return verduras

def insertar_producto(tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_producto"], (tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor))
	conn.commit()
	return cursor.lastrowid

def insertar_pedido(tipo, descripcion, comuna_id, nombre_comprador, email_comprador, celular_comprador):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_pedido"], (tipo, descripcion, comuna_id, nombre_comprador, email_comprador, celular_comprador))
	conn.commit()
	return cursor.lastrowid

def insertar_producto_fruta_verdura(id_producto, id_fruta_verdura):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_prod_fruta_verdura"], (id_producto, id_fruta_verdura))
	conn.commit()

def insertar_pedido_fruta_verdura(id_pedido, id_fruta_verdura):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_ped_fruta_verdura"], (id_pedido, id_fruta_verdura))
	conn.commit()

def insertar_foto(ruta_archivo, nombre_archivo, producto_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_foto"], (ruta_archivo, nombre_archivo, producto_id))
	conn.commit()

def get_productos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_productos"])
	productos = cursor.fetchall()
	return productos

def get_pedidos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_pedidos"])
	pedidos = cursor.fetchall()
	return pedidos

def get_producto_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_producto_by_id"], (id,))
	productos = cursor.fetchall()
	return productos

def get_pedido_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_pedido_by_id"], (id,))
	pedidos = cursor.fetchall()
	return pedidos

def get_productos_de_a_5(offset):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_productos_de_a_5"], (offset,))
	productos = cursor.fetchall()
	return productos

def get_pedidos_de_a_5(offset):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_pedidos_de_a_5"], (offset,))
	pedidos = cursor.fetchall()
	return pedidos

def contador_productos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["contador_productos"])
	productos = cursor.fetchone()
	return productos

def contador_pedidos():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["contador_pedidos"])
	pedidos = cursor.fetchone()
	return pedidos

def get_fotos_by_producto_id_y_ruta(id, ruta):
	conn = get_conn()
	cursor = conn.cursor()
	patron_like = f"%{ruta}%"
	cursor.execute(QUERY_DICT["get_fotos_by_producto_id_y_ruta"], (id, patron_like))
	fotos = cursor.fetchall()
	return fotos

def get_prod_verdura_fruta_by_producto_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_prod_verdura_fruta_by_producto_id"], (id,))
	prod_verduras = cursor.fetchall()
	return prod_verduras

def get_ped_verdura_fruta_by_pedido_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_ped_verdura_fruta_by_pedido_id"], (id,))
	ped_verduras = cursor.fetchall()
	return ped_verduras

def get_contador_productos_por_tipo():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["contador_productos_por_tipo"])
	productos = cursor.fetchall()
	return productos

def get_contador_pedidos_por_comuna():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["contador_pedidos_por_comuna"])
	pedidos = cursor.fetchall()
	return pedidos

