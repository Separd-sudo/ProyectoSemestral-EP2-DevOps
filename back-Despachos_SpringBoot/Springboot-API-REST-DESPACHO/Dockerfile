# Etapa 1: construcción del Backend Spring Boot con Maven
# Esta etapa compila el proyecto y genera el archivo .jar.
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Define el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia el archivo pom.xml para descargar dependencias primero.
COPY pom.xml .

# Descarga las dependencias sin compilar todavía.
# Esto mejora la caché de Docker en futuras construcciones.
RUN mvn dependency:go-offline -B

# Copia el código fuente del proyecto.
COPY src ./src

# Compila el proyecto y genera el .jar.
# Se omiten pruebas para acelerar el build en esta etapa de despliegue.
RUN mvn clean package -DskipTests


# Etapa 2: ejecución del Backend con una imagen liviana de Java
FROM eclipse-temurin:21-jre-alpine

# Crea un usuario no root para ejecutar la aplicación con menor privilegio.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Define el directorio de trabajo.
WORKDIR /app

# Copia el .jar generado desde la etapa de build.
COPY --from=build /app/target/*.jar app.jar

# Cambia el propietario del archivo al usuario de aplicación.
RUN chown -R appuser:appgroup /app

# Cambia a usuario no root.
USER appuser

# Expone el puerto interno usado por Spring Boot.
EXPOSE 8080

# Ejecuta la aplicación Spring Boot.
ENTRYPOINT ["java", "-jar", "app.jar"]