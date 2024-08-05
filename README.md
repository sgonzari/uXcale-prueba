# Primeros pasos
Para poder ejecutar este proyecto, es necesario tener instalado las siguientes herramientas:

- [Node](https://nodejs.org/en/download/package-manager/current)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Git](https://git-scm.com/downloads)

# Ejercicio 1
## Problemas detectados
Los problemas detectados frente al pseudocódigo proporcionado son:
- Para saber si un contenido es premium, no puede ser una clase diferente ya que debería de estar dentro de la misma clase o no en clase diferente.
- Uso incorrecto de validación, se hace uso de `typeof` cuando este no serviría para realizar dicha validación.
- Problema de extensión, el código está acoplado a la comprobación de los tipos `StreamingService` y `DownloadService`.
- Problema de responsabilidad única, la lógica para calcular los precios específicos de cada servicio está en el método `getTotal`.
- Acoplamiento, hay un acoplamiento muy fuerte entre `RegisteredUser` y las subclases de `Service`.

## Propuestas de mejoras
Debido a los problemas detectados frente al pseudocódigo proporcionado, adjunto posibles propuestas para mejorar estos errores:
- Para la comprobación de premium, será una opción dentro de la misma clase que indique si el contenido es premium o no.
- Hacer la correspondiente validación con `instanaceof` que nos sirve para verificar si el objeto recibido es una estancia de la clase correspondiente.
- Para el problema del acoplamiento, extensiones y responsabilidad única, desacoplaremos los servicios específicos en el código con su correspondiente cálculo y realizaremos dicho cálculo en su respectiva clase de servicio.


# Ejercicio 2
## Breve guía
En este repositorio, se encuentran 2 proyectos en conjunto el cual uno es necesario del otro, por una parte tenemos el Front y por otra parte tenemos la API para que este Front pueda funcionar.

### react-meetup
Este es el proyecto Front que se pide en la prueba técnica a resolver.

### react-meetup-api
Como su propio nombre indica, este es el proyecto API para que Front pueda consumir de ella.