# 🗄️ Capa de Datos y Persistencia Aislada - PostgreSQL

Este módulo implementa el patrón **Database-per-Service** (Una Base de Datos por Microservicio), garantizando que la capa de Ventas y la de Despachos mantengan un acoplamiento suelto, sin compartir esquemas ni colisionar en tiempo de ejecución.

---

## 💾 Persistencia Basada en Volúmenes Declarativos

Para asegurar la durabilidad de los datos y evitar pérdidas al reiniciar el clúster o detener los contenedores locales, el archivo `docker-compose.yml` monta dos volúmenes físicos dedicados en el host:
*   `postgres_ventas_data` ➡️ Asignado al directorio de datos de Ventas.
*   `postgres_despachos_data` ➡️ Asignado al directorio de datos de Despachos.

En producción (AWS EKS), esta persistencia se abstrae mediante recursos nativos de AWS y volúmenes elásticos.

---

## 🗺️ Inicialización Automatizada de Esquemas

Los contenedores oficiales de PostgreSQL ejecutan automáticamente los scripts SQL al inicializarse por primera vez gracias al punto de entrada estandarizado de Docker (`/docker-entrypoint-initdb.d/`):

1.  **Ventas (`ventas-init.sql`)**: Estructura el almacenamiento comercial en la base de datos `ventas_db` y crea la tabla `venta` y su secuencia correspondiente de IDs.
2.  **Despachos (`despachos-init.sql`)**: Estructura el mapa logístico dentro de la base de datos `despachos_db` y crea la tabla `despacho` con las llaves primarias independientes.

---

## 🛠️ Acceso de Auditoría y Diagnóstico Local (CLI)

Si necesitas auditar la base de datos directamente o correr consultas manuales de verificación desde la terminal de Docker, ejecuta:

*   **Inspeccionar la Base de Datos de Ventas (Puerto 5433 local):**
    ```bash
    docker exec -it postgres-ventas psql -U postgres -d ventas_db
    ```
    *Comando para listar las ventas registradas:*
    ```sql
    SELECT * FROM venta;
    ```

*   **Inspeccionar la Base de Datos de Despachos (Puerto 5434 local):**
    ```bash
    docker exec -it postgres-despachos psql -U postgres -d despachos_db
    ```
    *Comando para listar los despachos generados:*
    ```sql
    SELECT * FROM despacho;
    ```