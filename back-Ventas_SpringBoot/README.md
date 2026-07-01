# 🛒 Microservicio Backend Ventas - Spring Boot API REST

Este componente de software gestiona toda la capa de lógica comercial e ingresos de órdenes del ecosistema **Innovatech**. Opera de manera desacoplada con su propio ciclo de persistencia de datos relacionales.

## 🛠️ Especificaciones Técnicas locales
*   **Lenguaje/Framework**: Java 17 + Spring Boot
*   **Puerto de Escucha del Contenedor**: `8080`
*   **Mapeo de Puerto Host (Docker Compose)**: `8081`
*   **Base de Datos Relacionada**: `postgres-ventas` (Puerto local: `5433`, Base de datos: `ventas_db`)

---

## 💻 Desarrollo y Ejecución Local

### Prerrequisitos
*   Java JDK 17
*   Maven 3.8 o superior

### Comandos de Ejecución
1.  **Limpiar y Compilar**: Construye el paquete ejecutable `.jar` omitiendo pruebas de infraestructura:
    ```bash
    mvn clean package -DskipTests
    ```
2.  **Iniciar Servicio de Forma Local**:
    ```bash
    mvn spring-boot:run
    ```

---

## 🐳 Containerización (Docker y DevOps)

La construcción de la imagen se realiza de manera declarativa utilizando el contexto local en los pipelines de automatización.

*   **Construir imagen Docker manualmente**:
    ```bash
    docker build -t separdx/innovatech-backend-ventas:latest .
    ```
*   **Variables de Entorno Clave (Inyectadas en Producción)**:
    *   `SPRING_DATASOURCE_URL`: URL de conexión JDBC apuntando a la instancia de base de datos (`jdbc:postgresql://<host>:5432/ventas_db`).
    *   `SPRING_JPA_HIBERNATE_DDL_AUTO`: Configurado en `update` para sincronización automática de esquemas ORM.