# Establece la imagen base como Node.js 18 en Alpine Linux
FROM node:18-alpine3.17 as build

# Establece el directorio de trabajo dentro del contenedor como /app
WORKDIR /app

# Copia el contenido del directorio actual al directorio de trabajo del contenedor (/app)
COPY . /app

# Ejecuta el comando 'npm install' para instalar las dependencias del proyecto
RUN npm install

# Ejecuta el comando 'npm run build' para compilar el proyecto
RUN npm run build

# Establece la imagen base como Ubuntu para la siguiente etapa de construcción
FROM ubuntu

# Actualiza los repositorios de apt-get dentro del contenedor Ubuntu
RUN apt-get update

# Instala el servidor web Nginx en el contenedor Ubuntu
RUN apt-get install nginx -y

# Copia el archivo de configuración personalizado de Nginx al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos compilados desde la imagen anterior (build stage) al directorio de Nginx donde se sirven los archivos estáticos
COPY --from=build /app/dist /var/www/html/

# Expone el puerto 80 del contenedor para que sea accesible desde fuera del contenedor
EXPOSE 80

# Establece el comando predeterminado para iniciar Nginx en el primer plano cuando se inicia el contenedor
CMD ["nginx", "-g", "daemon off;"]
