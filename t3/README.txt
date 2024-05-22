TAREA 2 - CC5002 - FELIPE VALDEBENITO BRAVO
Consideraciones:

1.- Los estilos son bien básicos para mi gusto, me centré sobre todo en la funcionalidad mas que
en el diseño propio de la página.

2.- En la base de datos de las fotos se hace la distincion para los distintos tamaños de imagen, a su vez que en 
/resources/img, estan las fotos basicamente duplicadas pero con distintos tamaños (convertidos gracias a pillow).
Se tomo la decision de hacerlo asi debido a una recomendacion del profesor sobre evitar el modificar y cargar imagenes
durante la ejecucion de la pagina web, ya que puede causar una lentitud considerable.

3.- En el formulario para añadir productos, se tomo la decision de usar botones a modo de añadir o quitar campos de
fotos para facilitar la validacion independiente de los campos, la version de la tarea 1 se basaba en que al añadir una foto,
automaticamente se añadia un campo, pero esto en la tarea 2 causaba problemas de validacion al existir un campo vacio.

4.- En la informacion del producto hay un modal que en el texto no hace nada, pero en la ejecucion ayuda a desplegar la imagen en 1280x1024,
por lo que no es que no cumpla funcion en principio, sino que se usan sus campos a modo de apoyo para generar el modal por cada imagen

5.- El formato del correo solo se rige por texto@texto.texto, usando expresiones regulares. Se que hay
formas de comprobar que las direcciones y dominios si existan, pero por razones de simplicidad se ha dejado
de esta forma.

6.- Ahora el codigo en los archivos javascript de agregar-producto y agregar-pedido es parcialmente diferente, esto basado en los cambios que
se le han realizado por esta tarea en particular. Aun asi, presentan varias funciones clonadas, y en el caso de agregar-pedido, mantiene su
estructura original de la tarea 1.

7.- Se ha puesto placeholders a los inputs de los formularios a modo de hacer entendible que debe incluir el
campo, sea obligatorio u opcional. Por lo mismo, los campos acompañados con asterisco (*) son obligatorios.