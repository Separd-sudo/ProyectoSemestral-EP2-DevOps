# 🖥️ Frontend - Despacho Dashboard (React + Vite)

Este contenedor aloja la interfaz de cara al usuario del sistema Innovatech. Está diseñado para unificarse y consumir los recursos de los servicios de backend a través de la red perimetral.

## 🌐 Configuración de Red e interconexión (Bridge)
El contenedor se ejecuta bajo la red aislada `innovatech-network` con el driver de tipo `bridge`. 

### Cadena de Dependencias Nativas
Según lo establecido en el modelo declarativo, el contenedor del frontend implementa la directiva `depends_on`, lo que garantiza que la interfaz de usuario no se inicializará en el sistema hasta que los siguientes servicios core estén levantados y operativos:
1.  `backend-ventas`
2.  `backend-despachos`

---

## 🐳 Despliegue Individual en Contenedor

Si necesitas levantar o probar el contenedor de la capa de presentación de forma aislada sin utilizar el archivo compose global, ejecuta:

```bash
# 1. Construir la imagen del entorno estático
docker build -t separdx/innovatech-frontend:latest .

# 2. Correr el contenedor mapeando el tráfico HTTP estándar
docker run -d -p 80:80 --name frontend-despacho --network innovatech-network separdx/innovatech-frontend:latest