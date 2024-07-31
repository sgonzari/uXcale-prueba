# Front
## Inicialización
Para inicializar este proyecto, debes primero descargar las dependencias que requiere este mismo.
```bash
npm install
```

Una vez instalada las depedencias, podrás compilar y ejecutar el proyecto sin problema alguno.

## Modo desarrollo
Para poder ejecutar el proyecto en modo desarrollo se deberá de ejecutar la siguiente línea de comando:
```bash
npm start
```

## Test unitarios
Para poder ejecutar y obtener la cobertura por consola de los tests unitarios, se deberá de ejecutar la siguiente línea de comando:
```bash
npm test
```

## Compilación
Para poder compilar el proyecto, se debe de ejecutar la siguiente línea de comandos:
```bash
npm build
```

# Apuntes del desarrollador
> Debido a que se requería montar un sistema de enrutamiento en la aplicación por tema de SEO, he modificado toda la estructura base del proyecto haciendo uso de la librería `react-router-dom` para montar un sistema de enrutamiento con urls amigables. <br/> Para la animación que se requería en la barra de navegación he hecho uso por primera vez de la librería `framer-motion` el cuál ha hecho posible conseguir esa animación cuando scrolleas por la aplicación. <br/> Para el guardado y tratamiento de los datos estuve barajando si montar una pequeña API o manejar los datos mediante estados y opté por montarme una pequeña API hecha con `express.js` donde pudiera crear, actualizar, almacenar y consultar los datos en un fichero JSON. <br/> Para los tests unitarios, he hecho uso de librerías como `jest` y `@testing-library` y de la extensión `Coverage Gutters` para poder analizar y observar por qué puntos pasan los test unitarios, además de añadir la opción --coverage en el script de arranque de los tests para visualizar el % de cobertura en los tests. <br/> Me hubiera gustado realizar Tests E2E y Tests Funcionales pero por falta de tiempo no he podido realizarlos.