# 🖥️ Frontend - Despacho Dashboard (React + Vite)

Este componente aloja la capa de presentación del ecosistema **Innovatech**. Consiste en un panel de control interactivo construido en React y empaquetado sobre Nginx para servir el contenido estático.

---

## 🛠️ Especificaciones Técnicas y Requisitos

*   **Framework de Desarrollo:** React + Vite.
*   **Gestor de Dependencias:** Node.js (se recomienda Node 20+ o npm 10+).
*   **Estilos:** Tailwind CSS y Vanilla CSS.
*   **Servidor Web (Producción):** Nginx (Puerto 80).

---

## 💻 Desarrollo y Ejecución Local (Paso a Paso)

### 1. Prerrequisitos
*   Tener instalado **Node.js** (versión LTS recomendada).

### 2. Comandos de Ejecución y Desarrollo
Navega a la carpeta del frontend (`front_despacho/`) y ejecuta:

*   **Instalar dependencias locales:**
    ```bash
    npm install
    ```
*   **Iniciar el servidor de desarrollo local:**
    ```bash
    npm run dev
    ```
    *Esto levantará el frontend en [http://localhost:5173](http://localhost:5173) conectándolo a los backends locales definidos en `.env.development`.*

*   **Compilar para producción manualmente:**
    ```bash
    npm run build
    ```
    *Esto generará los activos listos y minificados dentro de la carpeta `dist/`.*

---

## 🐳 Containerización y DevOps

*   **Construir imagen Docker manualmente:**
    ```bash
    docker build -t separdx/innovatech-frontend:latest .
    ```

*   **Variables de Entorno del Build (Inyectadas en Compilación):**
    Dado que React se ejecuta del lado del cliente (navegador), las variables de entorno deben inyectarse en tiempo de compilación (`build-args`):
    *   `VITE_API_VENTAS_URL`: Endpoint base del balanceador del Backend de Ventas (Ej: `http://localhost:8081`).
    *   `VITE_API_DESPACHOS_URL`: Endpoint base del balanceador del Backend de Despachos (Ej: `http://localhost:8082`).

---

## ⚙️ Estructura de Páginas de la Aplicación

El dashboard cuenta con 3 secciones principales de navegación interactiva:
1.  **Inicio**: Vista de bienvenida, descripción de la empresa "¿Quiénes Somos?" y opiniones de los clientes.
2.  **Ordenes de Compra**: Permite visualizar la tabla de compras registradas en base de datos y abrir el modal interactivo de creación de nuevas ventas.
3.  **Ordenes de Despachos**: Tabla visualmente optimizada con colores y badges para revisar los despachos asociados, registrar fallas o cerrar el ciclo de entrega.