# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Prueba

Home:
✔1. Se muestra el header con su ícono de menú, Logo Orkestra e íconos de acceso
rápido:
✔    1. Directorio de Clientes
✔   2. Carrito
✔    3. Notificaciones

✔2. Debajo del header se encuentra el input buscador de productos
✔    1. Al teclear en automático enviará la petición de búsqueda de productos
✔    2. Al igual se tiene un ícono de lector de código de barras que 
        2.5. Al dar clickabrirá la ventana del lector que se describe más adelante.
✔    3. Debajo del buscador se muestra Filtro 
✔       1. Al hacer scroll down el header se oculta y queda fijo en la parte
        superior junto con su liga a filtros 
✔        2. se agrega una raya color azul en la parte inferior. 
✔      3. Al hacer scroll up el header regresa a su lugar.
✔   4. Cuando se tenga igual o mayor a un carácter ingresado en el input, el
        ícono de escaneo de código de barras cambia a un ícono de x
        1. Al dar click al ícono X, la búsqueda y resultados se limpia, regresa
        el ícono de scanner, y se muestran los resultados de inicio.

3. Listado de Resultados
✔     1. De inicio se muestran los primeros 10 resultados, que retorna la petición
    cuya documentación se comparte más adelante.
✔   2. Los productos se paginan de 10 en 10 y aparecen en un infinite scroll.
✔    3. Por cada resultado se muestra:
        1. Su imagen principal (1)
        2. Su descripción en caso de tener “Product_description”
        3. Su Nombre/modelo “Product_name”
        4. Precio con descuento en color rojo (en caso de tener)
        “price_with_discount”
        5. Precio “price”
        6. Color “color_name”
        7. Marca “brand_name”     
✔    4. Si la petición/búsqueda no retorna resultados entonces al centro del
        espacio del listado de resultados, debe aparecer un mensaje en texto rojo
        que diga: “No existen resultados para está búsqueda” Puedes agregar
        cualquier ícono.

Scanner:
✔1. Al ingresar a esta pantalla se muestra la liga “Regresar” que al dar click regresará
a la página de inicio.
✔2. Debajo aparece un título/instrucción: “Escanea el código”
✔3. Debajo aparece la pantalla donde se muestra la ventana/visualizador del scanner
utilizando la cámara del dispositivo.
    ✔1. Nota: Para el escaneo de productos, se puede utilizar cualquier librería o
    componente ya existente.

