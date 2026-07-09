# 🚀 Sistema de Distribución y Ventas Innovatech

Este repositorio contiene la solución completa de **Innovatech**, una plataforma diseñada con una arquitectura moderna de microservicios, totalmente contenerizada y orientada al despliegue continuo (CI/CD) de alta disponibilidad.

La plataforma permite registrar transacciones comerciales (ventas/compras) y automatiza el despacho de mercaderías de forma elástica y tolerante a fallas, comunicando los componentes mediante APIs REST internas y exponiendo accesos perimetrales controlados en la nube.

---

## 📂 Estructura General del Proyecto

*   **`front_despacho/`**: Interfaz de usuario en React + Vite.
*   **`back-Ventas_SpringBoot/`**: Microservicio comercial que gestiona las transacciones de ventas y persiste datos en su propia base de datos.
*   **`back-Despachos_SpringBoot/`**: Microservicio logístico encargado del control de rutas e intentos de entrega.
*   **`database/`**: Scripts de inicialización SQL para ambas bases de datos relacionales.
*   **`k8s/`**: Manifiestos de Kubernetes estructurados para el despliegue automático en AWS EKS.
*   **`docker-compose.yml`**: Orquestación local para levantar todo el ecosistema en desarrollo con un solo comando.

---

## 📐 Tabla de Mapeo de Puertos e Integración

| Contenedor / Servicio | Puerto Interno | Puerto Host (Local) | Propósito Técnico |
| :--- | :---: | :---: | :--- |
| **`frontend-despacho`** | `80` | `80` | Capa de presentación (React expuesto por Nginx) |
| **`backend-ventas`** | `8080` | `8081` | API Core de Ventas (Spring Boot) |
| **`backend-despachos`** | `8080` | `8082` | API Core de Despachos (Spring Boot) |
| **`postgres-ventas`** | `5432` | `5433` | Base de datos relacional para Ventas |
| **`postgres-despachos`** | `5432` | `5434` | Base de datos relacional para Despachos |

---

## 💻 Guía de Inicio Rápido (Desarrollo Local)

### Prerrequisitos
*   **Docker Desktop** (con Docker Compose CLI activo).
*   **Git** instalado.

### 1. Clonar el repositorio
Asegúrate de encontrarte en la rama `deploy`:
```bash
git clone https://github.com/Separd-sudo/ProyectoSemestral-EP2-DevOps.git
cd ProyectoSemestral-EP2-DevOps
git checkout deploy
```

### 2. Levantar el entorno completo con Docker Compose
Desde la raíz del proyecto, ejecuta el siguiente comando. Esto compilará las imágenes locales con Dockerfiles optimizados multietapa, creará la red bridge `innovatech-network` y levantará las instancias correspondientes:
```bash
docker compose up --build -d
```

### 3. Verificar el estado del entorno
*   **Listar contenedores activos**:
    ```bash
    docker compose ps
    ```
*   **Verificar logs en tiempo real**:
    ```bash
    docker compose logs -f
    ```
*   **Detener y liberar recursos**:
    ```bash
    docker compose down
    ```

Una vez levantado, accede al sitio web local abriendo tu navegador en [http://localhost](http://localhost).

---

## ☸ Despliegue en la Nube (AWS EKS - Producción)

El despliegue en producción es completamente automatizado mediante un pipeline de **GitHub Actions** (`deploy.yml`). Cada `git push` a la rama `deploy` realiza lo siguiente:
1.  Autenticación segura en AWS y Amazon ECR.
2.  Construcción y etiquetado de imágenes Docker utilizando el hash corto de commit (SHA) y el tag `latest`.
3.  Despliegue declarativo de recursos a Kubernetes en el namespace `innovatech-v2`.
4.  Ejecución de un Rollout Restart en el clúster para asegurar cero tiempo de inactividad.

---

## 🛠️ Modos de Depuración y Diagnóstico Comunes

### Acceder a los logs de Kubernetes
Si necesitas revisar el comportamiento interno de los servicios en producción:
```bash
# Ver logs del backend de ventas
kubectl logs deployment/backend-ventas-deployment -n innovatech-v2 --tail=100

# Ver logs del backend de despachos
kubectl logs deployment/backend-despachos-deployment -n innovatech-v2 --tail=100
```

### Verificar el Autoescalador (HPA)
El clúster escala elásticamente el microservicio de despachos según la carga de CPU:
```bash
kubectl get hpa -n innovatech-v2
```