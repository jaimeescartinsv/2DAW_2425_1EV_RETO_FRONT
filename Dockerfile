# Imagen base para la construcción del frontend
FROM node:18 AS build

# Directorio de trabajo para la etapa de construcción
WORKDIR /app

# Copia los archivos necesarios para la construcción
COPY package.json package-lock.json ./
COPY FRONT-END/gulpfile.js ./
COPY FRONT-END/source ./source

# Instala las dependencias
RUN npm install

# Ejecuta la compilación de SASS
RUN npx gulp compilar-sass

# Imagen final para producción
FROM nginx:stable-alpine

# Directorio donde estarán los archivos estáticos
WORKDIR /usr/share/nginx/html

# Limpia el contenido predeterminado de NGINX
RUN rm -rf ./*

# Copia la carpeta FRONT-END al contenedor
COPY FRONT-END/ ./FRONT-END/

# Copia la carpeta `dist` generada por Gulp
COPY --from=build /app/dist ./FRONT-END/dist/

# Copia la configuración personalizada de NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposición del puerto para NGINX
EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]