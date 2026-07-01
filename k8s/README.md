# ☸️ Manifiestos de Orquestación - Kubernetes (k8s)

Esta carpeta contiene la infraestructura como código necesaria para levantar de forma declarativa, elástica y resiliente el ecosistema Innovatech en **AWS EKS**.

## 🚀 Orden Cronológico de Despliegue

Para garantizar que las dependencias, configuraciones e inyección de datos se realicen correctamente, aplica los manifiestos en el siguiente orden estricto dentro del namespace `innovatech`:

### Paso 1: Configuraciones Globales y Secretos
Inyecta las variables de entorno y credenciales cifradas de la base de datos:

kubectl apply -f global/db-config.yaml -n innovatech
kubectl apply -f global/db-secrets.yaml -n innovatech

### Paso 2: Capa de Persistencia (PostgreSQL)
Despliega el motor relacional para que esté disponible cuando los backend inicien:

Bash
kubectl apply -f postgres-despachos/postgres-deployment.yaml -n innovatech
kubectl apply -f postgres-despachos/postgres-service.yaml -n innovatech

### Paso 3: Capa de Lógica de Negocio (Backends)
Levanta los microservicios core de la plataforma:

Bash
kubectl apply -f backend-despachos/deployment.yaml -n innovatech
kubectl apply -f backend-despachos/service.yaml -n innovatech

### Paso 4: Capa de Presentación Externa (Frontend)
Despliega la interfaz de usuario orientada al internet público:

Bash
kubectl apply -f frontend-despachos/deployment.yaml -n innovatech
kubectl apply -f frontend-despachos/service.yaml -n innovatech

### Paso 5: Elasticidad (Horizontal Pod Autoscaler)
Habilita el autoescalado automático basado en demandas de CPU:

Bash
kubectl apply -f backend-despachos/hpa.yaml -n innovatech

### Comandos Útiles de Monitoreo
Verificar todo el ecosistema:

bash
kubectl get pods,svc,hpa -n innovatech
Auditar logs de un pod en falla:

Bash
kubectl logs <nombre-del-pod> -n innovatech
Revisar eventos detallados de red:

Bash
kubectl describe svc frontend-despachos-service -n innovatech