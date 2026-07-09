# 📦 Microservicio Backend Despachos - Spring Boot API REST

Este componente de software es el motor logístico y de distribución del ecosistema **Innovatech**. Administra el estado de las entregas, registra los intentos fallidos de los camiones asignados y realiza el cierre formal de los despachos de mercadería.

---

## 🛠️ Especificaciones Técnicas y Requisitos

*   **Lenguaje y JDK:** Java 17 (JRE/JDK Eclipse-Temurin).
*   **Framework:** Spring Boot 3.4.4.
*   **Puerto del Servidor Interno:** `8080` (Mapeado localmente a `8082` en Docker Compose).
*   **Base de Datos Relacionada:** PostgreSQL (base de datos `despachos_db`).
*   **Gestor de Dependencias:** Maven.

---

## 💻 Desarrollo y Ejecución Local (Paso a Paso)

### 1. Prerrequisitos
*   Tener instalado **Java JDK 17**.
*   Tener instalado **Maven 3.8+** (o usar el wrapper de maven `./mvnw` incluido).
*   Una instancia de PostgreSQL corriendo localmente en el puerto `5434` con una base de datos llamada `despachos_db` (Usuario: `postgres`, Password: `postgres`).

### 2. Comandos de Compilación y Ejecución
Navega a la carpeta de este microservicio (`back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO`) y ejecuta:

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
    docker build -t innovatech-backend-despachos:latest .
    ```

*   **Variables de Entorno Configurables (Inyectadas mediante ConfigMaps/Secrets):**
    *   `SPRING_DATASOURCE_URL`: String de conexión JDBC (Ej: `jdbc:postgresql://postgres-despachos:5432/despachos_db`).
    *   `SPRING_DATASOURCE_USERNAME`: Usuario de la base de datos (Ej: `postgres`).
    *   `SPRING_DATASOURCE_PASSWORD`: Contraseña (Inyectada desde Secretos).

---

## 🔗 Endpoints del API Rest (Puerto 8082 Local)

*   **`GET /api/v1/despachos`**: Listar todas las órdenes de despacho activas y finalizadas.
*   **`GET /api/v1/despachos/{idDespacho}`**: Obtener el detalle de una orden de despacho específica.
*   **`POST /api/v1/despachos`**: Registrar un nuevo despacho (invocado de forma interna y automática por el microservicio de ventas).
    *   *Ejemplo payload:*
        ```json
        {
          "idCompra": 2,
          "direccionCompra": "Av. Vitacura 2000, Vitacura",
          "valorCompra": 85000,
          "fechaDespacho": "2026-07-08",
          "patenteCamion": "CC-DD-22",
          "intento": 1,
          "despachado": false
        }
        ```
*   **`PUT /api/v1/despachos/{idDespacho}`**: Actualizar los datos de un despacho (útil para registrar intentos fallidos o actualizar la patente del vehículo).
*   **`POST /api/v1/despachos/{idDespacho}/cerrar`**: Finalizar un despacho de forma exitosa cerrando el ciclo logístico.