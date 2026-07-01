# 🗄️ Capa de Datos y Persistencia Aislada - PostgreSQL

Este módulo implementa el patrón **Database-per-Service** (Una Base de Datos por Microservicio), garantizando que la capa de Ventas y la capa de Despachos no compartan esquemas ni colisionen en tiempo de ejecución.

## 💾 Persistencia Basada en Volúmenes Declarativos
Para asegurar la inmutabilidad de los datos y evitar pérdidas al reiniciar el clúster, el archivo `docker-compose.yml` monta dos volúmenes físicos dedicados:
*   `postgres_ventas_data` ➡️ Asignado al directorio de datos de Ventas.
*   `postgres_despachos_data` ➡️ Asignado al directorio de datos de Despachos.

## 🗺️ Inicialización Automatizada de Esquemas
Los contenedores ejecutan automáticamente los scripts SQL perimetrales al inicializarse por primera vez gracias al punto de entrada oficial de PostgreSQL (`/docker-entrypoint-initdb.d/`):

1.  **Ventas (`ventas-init.sql`)**: Estructura el almacenamiento comercial en la base de datos `ventas_db`.
2.  **Despachos (`despachos-init.sql`)**: Estructura el mapa logístico dentro de la base de datos `despachos_db`.

## 🛠️ Acceso de Auditoría y Pruebas Clínicas (CLI)

*   **Inspeccionar Base de Datos de Ventas (Puerto 5433)**:
    ```bash
    docker exec -it postgres-ventas psql -U postgres -d ventas_db
    ```
*   **Inspeccionar Base de Datos de Despachos (Puerto 5434)**:
    ```bash
    docker exec -it postgres-despachos psql -U postgres -d despachos_db
    ```