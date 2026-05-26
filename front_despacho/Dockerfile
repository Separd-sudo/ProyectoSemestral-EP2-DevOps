# Etapa 1: construcción del proyecto React/Vite
# Se usa una imagen de Node para instalar dependencias y generar la carpeta dist.
FROM node:20-alpine AS build

# Define el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar la caché de Docker.
COPY package*.json ./

# Instala las dependencias del proyecto.
RUN npm install

# Copia el resto del código fuente del Frontend.
COPY . .



ARG VITE_API_VENTAS_URL
ARG VITE_API_DESPACHOS_URL
ENV VITE_API_VENTAS_URL=$VITE_API_VENTAS_URL
ENV VITE_API_DESPACHOS_URL=$VITE_API_DESPACHOS_URL
# Construye la versión productiva del proyecto.
RUN npm run build


# Etapa 2: servidor web liviano con Nginx
# Solo se copia el resultado final del build, no todo el código fuente.
FROM nginx:alpine

# Copia configuración personalizada de Nginx.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados por Vite hacia la carpeta pública de Nginx.
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 para acceso HTTP.
EXPOSE 80

# Ejecuta Nginx en primer plano para mantener el contenedor activo.
CMD ["nginx", "-g", "daemon off;"]