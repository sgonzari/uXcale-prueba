# Pasos previos
Para poder ejecutar este proyecto, es necesario tener instalado las siguientes herramientas:

- [Node](https://nodejs.org/en/download/package-manager/current)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Git](https://git-scm.com/downloads)

# Inicialización

### Clonar repositorio:
   ```bash
   git clone https://github.com/sgonzari/uXcale-prueba.git
   cd uXcale-prueba
   ```

## Front
Aplicación web para la prueba técnica de uXcale.
### Instalación de dependencias:
   ```bash
   cd react-meetup
   npm install
   ```

### Ejecución de tests unitarios:
  ```bash
  npm test
  ```

### Ejecución en modo desarrollo:
   ```bash
   npm start
   ```
   Esto abrirá el proyecto en `http://localhost:3000` en el navegador.


## API
Mini API para tratamiento y almacenamiento de datos.
### Instalación de dependencias:
   ```bash
   cd react-meetup-api
   npm install
   ```

### Ejecución en modo desarrollo:
   ```bash
   node App.js
   ```
   Esto abrirá el endpoint en `http://localhost:3030` para el consumo de la API.


# Apuntes del desarrollador
> Debido a que se requería montar un sistema de enrutamiento en la aplicación por tema de SEO, he modificado toda la estructura base del proyecto haciendo uso de la librería `react-router-dom` para montar un sistema de enrutamiento con urls amigables. <br/> Para la animación que se requería en la barra de navegación he hecho uso por primera vez de la librería `framer-motion` el cuál ha hecho posible conseguir esa animación cuando scrolleas por la aplicación. <br/> Para el guardado y tratamiento de los datos estuve barajando si montar una pequeña API o manejar los datos mediante estados y opté por montarme una pequeña API hecha con `express.js` donde pudiera crear, actualizar, almacenar y consultar los datos en un fichero JSON. <br/> Para los tests unitarios, he hecho uso de librerías como `jest` y `@testing-library` y de la extensión `Coverage Gutters` para poder analizar y observar por qué puntos pasan los test unitarios, además de añadir la opción --coverage en el script de arranque de los tests para visualizar el % de cobertura en los tests. <br/> Me hubiera gustado realizar Tests E2E y Tests Funcionales pero por falta de tiempo no he podido realizarlos.