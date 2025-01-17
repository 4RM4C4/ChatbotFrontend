# SushiChat Frontend

Este proyecto es un SushiChat Frontend realizado con Vite. A continuación, se detallan los pasos necesarios para instalar y correr el proyecto, así como información sobre la configuración necesaria y los endpoints utilizados.

---

## **Instalación y ejecución**

### **Requisitos previos**
- Node.js (versión 14 o superior).
- npm (gestor de paquetes que viene con Node.js).

### **Pasos para instalar y correr el proyecto**
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/4RM4C4/ChatbotFrontend
   cd ChatbotFrontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar el entorno:**
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_PORT=3001
   VITE_USERLOGIN=http://localhost:3001/api/users/login
   VITE_CHATENDPOINT=http://localhost:3001/api/chat/
   VITE_USERSIGNUP=http://localhost:3001/api/users/signup
   ```

4. **Ejecutar el proyecto en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Esto levantará el proyecto en el puerto definido en `VITE_PORT`. Por defecto, estará disponible en [http://localhost:3001](http://localhost:3001).

5. **Construir para producción (opcional):**
   ```bash
   npm run build
   ```
   Los archivos de producción estarán disponibles en el directorio `dist`.

---

## **Variables de entorno**
| Variable           | Descripción                                                |
|--------------------|------------------------------------------------------------|
| `VITE_PORT`        | Puerto donde se ejecutará la aplicación.                   |
| `VITE_USERLOGIN`   | Endpoint para iniciar sesión de los usuarios.              |
| `VITE_CHATENDPOINT`| Endpoint para manejar las interacciones del chatbot.        |
| `VITE_USERSIGNUP`  | Endpoint para registrar nuevos usuarios.                   |

---
