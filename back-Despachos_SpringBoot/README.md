# 📦 Microservicio Backend Despachos - Spring Boot API REST

Este componente de software es el núcleo logístico del ecosistema **Innovatech**. Procesa, administra y monitoriza los flujos de distribución física y de asignación de rutas logísticas de la plataforma.

## 🛠️ Especificaciones Técnicas locales
*   **Lenguaje/Framework**: Java 17 + Spring Boot
*   **Puerto de Escucha del Contenedor**: `8080`
*   **Mapeo de Puerto Host (Docker Compose)**: `8082`
*   **Base de Datos Relacionada**: `postgres-despachos` (Puerto local: `5434`, Base de datos: `despachos_db`)

---

## 💻 Desarrollo y Ejecución Local

### Prerrequisitos
*   Java JDK 17
*   Maven 3.8 o superior

### Comandos de Ejecución
1.  **Limpiar y Compilar**: Construye el paquete ejecutable `.jar` empaquetando la lógica de negocio:
    ```bash
    mvn clean package -DskipTests
    ```
2.  **Iniciar Servicio de Forma Local**:
    ```bash
    mvn spring-boot:run
    ```

---

## 🐳 Containerización (Docker y DevOps)

Este componente se encuentra diseñado bajo el pilar de inmutabilidad, permitiendo empaquetar su lógica y dependencias en imágenes reproducibles.

*   **Construir imagen Docker manualmente**:
    ```bash
    docker build -t separdx/innovatech-backend-despachos:latest .
    ```
*   **Variables de Entorno Clave (Inyectadas en Producción)**:
    *   `SPRING_DATASOURCE_URL`: URL de conexión JDBC exclusiva para el aislamiento de datos logísticos (`jdbc:postgresql://<host>:5432/despachos_db`).
    *   `SPRING_JPA_HIBERNATE_DDL_AUTO`: Configurado en `update` para la creación y mapeo automático de tablas lógicas en el orquestador.