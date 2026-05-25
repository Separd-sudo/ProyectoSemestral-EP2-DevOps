# =========================================================
# ETAPA 1 — COMPILACIÓN DEL PROYECTO
# =========================================================
# Esta etapa utiliza Maven y Java 17 para compilar
# el backend y generar el archivo .jar.
# =========================================================

FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copiamos todos los archivos del proyecto.
COPY . .

# Compilamos el proyecto sin ejecutar tests.
RUN mvn clean package -DskipTests


# =========================================================
# ETAPA 2 — IMAGEN FINAL LIVIANA
# =========================================================
# Se utiliza una imagen mucho más ligera
# solo para ejecutar el .jar generado.
# =========================================================

FROM eclipse-temurin:17-jre

# Directorio de trabajo del contenedor.
WORKDIR /app

# Creamos usuario NO ROOT por seguridad.
RUN useradd -m springuser

# Copiamos el .jar compilado desde la etapa builder.
COPY --from=builder /app/target/*.jar app.jar

# Cambiamos permisos del archivo.
RUN chown -R springuser:springuser /app

# Cambiamos al usuario seguro.
USER springuser

# Puerto expuesto por Spring Boot.
EXPOSE 8080

# Comando de inicio del contenedor.
ENTRYPOINT ["java", "-jar", "app.jar"]