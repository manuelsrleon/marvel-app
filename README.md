# Guía de inicio rápido

## Instalación de dependencias

Una vez clonado el repositorio, cd a la carpeta raíz del proyecto y

`npm install`

## Lanzamiento del servidor de desarrollo

`npm run dev`

## Lanzamiento build de producción

`npm run build` para generar las páginas estáticas optimizadas.
`npm next start`

## Testing

El proyecto tiene configurado Jest adaptado a NextJS, usando JSDom. Los tests se lanzan con

`npm test`

## API Key

Para poder utilizar la aplicación, se ha incluido el API Key. Si bien esto no es lo óptimo, se ha hecho con la intención de facilitar la corrección de la prueba.

## Happy path

Se ha contemplado el happy path en los documentos de diseño con intención de acotar el scope de la prueba