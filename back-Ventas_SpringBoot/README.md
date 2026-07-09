# 🛒 Microservicio Backend Ventas - Spring Boot API REST

Este microservicio se encarga de gestionar toda la capa comercial, almacenamiento y auditoría de órdenes de venta dentro de la plataforma **Innovatech**.

---

## 🛠️ Especificaciones Técnicas y Requisitos

*   **Lenguaje y JDK:** Java 17 (JRE/JDK Eclipse-Temurin).
*   **Framework:** Spring Boot 3.4.4.
*   **Puerto del Servidor Interno:** `8080` (Mapeado localmente a `8081` en Docker Compose).
*   **Base de Datos Relacionada:** PostgreSQL (base de datos `ventas_db`).
*   **Gestor de Dependencias:** Maven.

---

## 💻 Desarrollo y Ejecución Local (Paso a Paso)

### 1. Prerrequisitos
*   Tener instalado **Java JDK 17**.
*   Tener instalado **Maven 3.8+** (o usar el wrapper de maven `./mvnw` incluido).
*   Una instancia de PostgreSQL corriendo localmente en el puerto `5433` con una base de datos llamada `ventas_db` (Usuario: `postgres`, Password: `postgres`).

### 2. Configurar Propiedades locales
Las propiedades se configuran en `src/main/resources/application.properties`. Por defecto, está preparado para leer las credenciales del sistema o tomar los valores del entorno de desarrollo.

### 3. Comandos de Compilación y Ejecución
Navega a la carpeta de este microservicio (`back-Ventas_SpringBoot/Springboot-API-REST`) y ejecuta:

*   **Limpiar dependencias y compilar (Crear JAR ejecutable):**
    ```bash
    mvn clean package -DskipTests
    ```
    *Esto creará el archivo ejecutable en `target/Springboot-API-REST-0.0.1-SNAPSHOT.jar`.*

*   **Levantar el servicio localmente:**
    ```bash
    mvn spring-boot:run
    ```

---

## 🐳 Containerización y DevOps

El empaquetado del microservicio se realiza de forma inmutable mediante un **Dockerfile multietapa** para asegurar que el contenedor de producción pese lo mínimo y carezca de dependencias innecesarias de compilación.

*   **Construir la imagen de Docker manualmente:**
    ```bash
    docker build -t innovatech-backend-ventas:latest .
    ```

*   **Variables de Entorno Configurables (Inyectadas mediante ConfigMaps/Secrets):**
    *   `SPRING_DATASOURCE_URL`: String de conexión JDBC (Ej: `jdbc:postgresql://postgres-ventas:5432/ventas_db`).
    *   `SPRING_DATASOURCE_USERNAME`: Usuario de la base de datos (Ej: `postgres`).
    *   `SPRING_DATASOURCE_PASSWORD`: Contraseña (Inyectada desde Secretos).
    *   `BACKEND_DESPACHOS_HOST`: Host del microservicio de despachos para comunicación interna (Ej: `backend-despachos-service` en producción o `backend-despachos` en docker-compose).

---

## 🔗 Endpoints del API Rest (Puerto 8081 Local)

*   **`GET /api/v1/ventas`**: Listar todas las ventas registradas.
*   **`GET /api/v1/ventas/{idVenta}`**: Obtener el detalle de una venta por ID.
*   **`POST /api/v1/ventas`**: Registrar una venta y disparar de forma automática la orden de despacho correspondiente al microservicio de distribución.
    *   *Ejemplo payload:*
        ```json
        {
          "direccionCompra": "Av. Vitacura 2000, Vitacura",
          "fechaCompra": "2026-07-08",
          "valorCompra": 85000,
          "despachoGenerado": false,
          "patenteCamion": "CC-DD-22"
        }
        ```
*   **`DELETE /api/v1/ventas/{idVenta}`**: Eliminar una venta por ID.
*   **`PUT /api/v1/ventas/{idVenta}`**: Actualizar los datos de una venta existente.