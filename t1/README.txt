TAREA 1 - CC5002 - FELIPE VALDEBENITO BRAVO
Consideraciones:

1.- Los estilos son bien básicos para mi gusto, me centré sobre todo en la funcionalidad mas que
en el diseño propio de la página.

2.- Sobre las imagenes que se muestran en informacion-producto.html, la imagen que se abre en el
modal es simplemente una reconversión de la imagen que se muestra en la página de informacion. La
idea era diferenciar entre fotos con distintas resoluciones para evitar tiempos de carga innecesarios
(esto explica el porque en resources/img hay diversas carpetas dependiendo el tamaño de la imagen).
Por ahora se desplegará así en la medida que no se avance con el servidor de la página (si es que así
ocurre).

2.- Sobre el modal de confirmación al agregar un producto o pedido, cuando se abre el documento
directamente desde html y desde el navegador Safari, al confirmar la adicion de los datos, no se muestra
el modal de adicion confirmada, sino que simplemente redirecciona al inicio (tal como el modal de
confirmacion se ha diseñado). Esto no ocurre con otros navegadores, ni al momento de usar Live Server,
donde incluso en Safari funciona como debiese. No se por que ocurre eso, incluso habiendo aplicado soluciones
de diversas fuentes.

3.- El numero de telefono solicitado en los archivos de agregar, considera un formato como sigue:
- Puede comenzar con un signo '+' opcional.
- Le siguen de 1 a 3 dígitos (el código del país).
- Luego, puede haber un separador opcional que puede ser un guión, punto o espacio.
- A continuación, puede haber un par opcional de paréntesis que encierra de 2 a 3 dígitos (el código de área).
- Puede seguir otro separador opcional.
- Luego, debería haber exactamente 3 dígitos (el número de intercambio local).
- Puede seguir otro separador opcional.
- Finalmente, debería haber exactamente 4 dígitos (el número del suscriptor).
El formato fue extraido de internet.

4.- El formato del correo solo se rige por texto@texto.texto, usando expresiones regulares. Se que hay
formas de comprobar que las direcciones y dominios si existan, pero por razones de simplicidad se ha dejado
de esta forma.

5.- Habian vegetales repetidos por lo que fueron removidos

6.- De momento, el código esta repetido en los archivos de agregar-producto y agregar-pedido. Idealmente se
iba a hacer un proceso de modularizacion, comenzando por los datos que se encuentran en un .js localizado en 
resources/data/, pero al probar los HTML accediendo directamente a ellos sin el uso de Live Server hacia fallar
la interacción con los botones de enviar formulario, principalmente no se validaban los datos ingresados (o los 
que todavia no habian sido ingresados)- Se ha decidido dejarlo asi por si eventualmente hay que aplicar muchos 
cambios, ademas de que realmente solo se repiten las validaciones y el codigo para crear los selectores de 
frutas y verduras.

7.- Se ha puesto placeholders a los inputs de los formularios a modo de hacer entendible que debe incluir el
campo, sea obligatorio u opcional.