# Desafío CRUD de Personas

Aplicación **Full Stack** que permite crear, listar, actualizar y eliminar personas, desarrollada con **Spring Boot (backend)** y **React + TypeScript (frontend)**.  
El objetivo es demostrar integración entre ambos entornos y aplicar buenas prácticas de desarrollo moderno.

---

## 🚀 Tecnologías utilizadas

### 🖥 Backend
- Java 17  
- Spring Boot 3  
- Spring Data JPA  
- H2 Database (en memoria)  
- Maven  
- Lombok  

### 💻 Frontend
- React 18  
- TypeScript  
- Vite  
- Axios  
- CSS simple y componentes funcionales con Hooks  

---

## Estructura del proyecto

desafio-crud-personas/
│
├── backend/ # Proyecto Spring Boot
│ ├── src/main/java/com/desafio/personas/
│ ├── pom.xml
│ └── target/
│
├── frontend/ # Proyecto React + TypeScript
│ ├── src/
│ ├── package.json
│ └── vite.config.ts
│
└── README.md

yaml
Copiar código

---

## Cómo ejecutar el proyecto localmente

### Clonar el repositorio

```bash
git clone https://github.com/gonzalolopeztroncoso-source/desafio-crud-personas.git
cd desafio-crud-personas
2️⃣ Ejecutar el Backend
Desde la carpeta backend:

cd backend
mvn spring-boot:run
El backend se iniciará en
👉 http://localhost:8080

Endpoints disponibles:

GET /personas — Listar todas las personas

POST /personas — Crear persona

PUT /personas/{id} — Actualizar persona

DELETE /personas/{id} — Eliminar persona

Base de datos: H2 en memoria
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb

3️⃣ Ejecutar el Frontend
En otra terminal, desde la carpeta frontend:

cd frontend
npm install
npm run dev
El frontend se iniciará en
👉 http://localhost:5173

Y se conectará automáticamente con el backend (http://localhost:8080).

🧠 Funcionalidades
✅ Crear una persona con sus datos básicos
✅ Listar todas las personas registradas
✅ Editar información existente
✅ Eliminar registros
✅ Validaciones de formulario en frontend
✅ Validaciones de modelo en backend

🧩 Autor
👨‍💻 Gonzalo Ignacio López Troncoso
Desarrollador Backend | Java - Spring Boot - React
📍 Santiago, Chile
📧 gonzalolopeztroncoso@gmail.com