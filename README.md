# 🚀 Sistema Distribuidor Innovatech - Plataforma de Despachos

Este repositorio aloja la solución elástica y multi-capa de **Innovatech**. El sistema está totalmente contenerizado y diseñado bajo el patrón de arquitectura de microservicios distribuidos con bases de datos independientes.

## 📐 Arquitectura de Microservicios y Puertos
La orquestación local y de producción se divide en las siguientes capas aisladas:

| Contenedor / Servicio | Puerto Interno | Puerto Host (Local) | Propósito Técnico |
| :--- | :---: | :---: | :--- |
| `frontend-despacho` | `80` | `80` | Interfaz de Usuario (React + Vite) |
| `backend-despachos` | `8080` | `8082` | API Core de Logística y Despachos |
| `backend-ventas` | `8080` | `8081` | API Core Comercial y de Ventas |
| `postgres-despachos`| `5432` | `5434` | Persistencia de Datos de Distribución |
| `postgres-ventas`   | `5432` | `5433` | Persistencia de Datos Comerciales |

---

## 💻 Orquestación Local con Docker Compose

### Prerrequisitos
*   Docker Desktop e interfaz CLI de Docker Compose.

### Puesta en Marcha del Entorno Completo
Para levantar toda la arquitectura de software (las 2 bases de datos, los 2 backends y el frontend) interconectados de forma automática, ejecuta en la raíz del proyecto:

```bash
# Construir imágenes locales y levantar contenedores en segundo plano
docker-compose up --build -d

Comandos de Administración Local

Verificar estado de la red e infraestructura:

Bash
docker-compose ps
Monitorear logs unificados en tiempo real:

Bash
docker-compose logs -f
Destruir el entorno liberando recursos:

Bash
docker-compose down