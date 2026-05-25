============================================================
🚀 Innovatech - Plataforma de Ventas y Despachos
============================================================

📌 Descripción del Proyecto

Este proyecto consiste en el desarrollo de una plataforma basada en arquitectura de microservicios para la gestión de:

- Ventas
- Despachos

El sistema aplica principios de DevOps, contenedorización con Docker y despliegue en la nube (AWS EC2).

------------------------------------------------------------

🧱 Arquitectura del Sistema

El sistema está compuesto por:

Frontend:
- React + Vite
- Consumo de APIs REST con Axios

Backend Ventas:
- Spring Boot
- Gestión de órdenes de compra

Backend Despachos:
- Spring Boot
- Gestión de despachos

Bases de Datos:
- PostgreSQL (una por microservicio)

------------------------------------------------------------

🐳 Contenedorización con Docker

Todos los servicios están dockerizados y orquestados con Docker Compose.

Estructura del proyecto:

ProyectoSemestral-EP2-DevOps/
│
├── docker-compose.yml
├── .env.example
├── README.txt
├── front_despacho/
├── back-Ventas_SpringBoot/
├── back-Despachos_SpringBoot/
└── .github/workflows/deploy.yml

------------------------------------------------------------

⚙️ Configuración de Entorno

Variables principales:

VITE_API_VENTAS_URL=http://localhost:8081
VITE_API_DESPACHOS_URL=http://localhost:8082

SPRING_DATASOURCE_VENTAS_URL=jdbc:postgresql://postgres-ventas:5432/ventas_db
SPRING_DATASOURCE_DESPACHOS_URL=jdbc:postgresql://postgres-despachos:5432/despachos_db

------------------------------------------------------------

▶️ Ejecución del Proyecto (Local)

Comando:

docker compose up --build

Accesos:

Frontend: http://localhost
Backend Ventas: http://localhost:8081
Backend Despachos: http://localhost:8082

------------------------------------------------------------

☁️ Despliegue en AWS EC2

Configuración realizada:

- Instancia EC2
- IP elástica
- Reglas de seguridad:
  - Puerto 80 (Frontend)
  - Puerto 8081 y 8082 (Backends)
  - Puerto 22 (SSH)

Proceso:

1. Conexión por SSH
2. Clonación del repositorio
3. Ejecución de docker compose up -d

------------------------------------------------------------

🔄 CI/CD con GitHub Actions

Pipeline automatizado:

1. Push a rama "deploy"
2. Build de imágenes Docker
3. Push a Docker Hub
4. Conexión a EC2 vía SSH
5. Deploy automático

Archivo:

.github/workflows/deploy.yml

------------------------------------------------------------

🐋 Docker Hub

Se publican imágenes de:

- Frontend
- Backend Ventas
- Backend Despachos

------------------------------------------------------------

⚠️ Problemas Encontrados

- Conflicto entre driver MySQL y PostgreSQL
- Problemas de conexión frontend-backend en EC2
- Variables de entorno mal configuradas
- Reglas de seguridad incorrectas

------------------------------------------------------------

🧠 Soluciones Aplicadas

- Uso de variables de entorno
- Implementación de IP elástica
- Configuración de red en Docker Compose
- Automatización CI/CD

------------------------------------------------------------

🧪 Estado del Proyecto

✔ Docker funcionando
✔ Microservicios implementados
✔ CI/CD configurado
✔ Despliegue en AWS (parcial)

------------------------------------------------------------

🎯 Conclusión

Se logró implementar una arquitectura basada en microservicios, utilizando Docker, CI/CD y despliegue en la nube, aplicando principios fundamentales de DevOps.

------------------------------------------------------------

👨‍💻 Autor

Brandon Andrés Pardo Sepúlveda
Benjamin aravena

============================================================