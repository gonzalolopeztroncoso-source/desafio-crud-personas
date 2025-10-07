# Desafío Técnico 2025 - CRUD Personas

Este proyecto implementa un **CRUD completo de personas**, incluyendo:
- Validaciones (`RUT`, `nombre`, `apellido`, `fecha de nacimiento`)
- Dirección embebida (`calle`, `comuna`, `región`)
- Cálculo automático de edad
- Persistencia en **base H2 en memoria**
- Documentación interactiva con **Swagger UI**

---

## Tecnologías utilizadas
| Componente | Versión / Tecnología |
|-------------|----------------------|
| Java | 17 |
| Spring Boot | 3.5.4 |
| Maven | 3.9+ |
| Lombok | 1.18.34 |
| H2 Database | 2.3.232 |
| Springdoc OpenAPI | 2.7.0 |
| JPA / Hibernate | Incluido en Spring Boot |
| Validaciones | Jakarta Validation (JSR-380) |

---

### Acceder a la API

* Swagger UI: http://localhost:8080/swagger-ui/index.html
* API JSON: http://localhost:8080/v3/api-docs
* H2 Console: http://localhost:8080/h2-console
  * URL: jdbc:h2:mem:testdb
  * User: sa
  * Password: (vacío)


##  Estructura del proyecto
src/main/java/com/desafio/personas
├── BackendApp.java # Clase principal
├── controller/PersonaController # Endpoints REST
├── service/PersonaService # Lógica de negocio
├── repository/PersonaRepository # Acceso a datos
├── model/Persona, Address # Entidades y DTOs
├── exception/ # Manejo de errores


---

## Compilar y empaquetar con Maven

### 1. Clonar el proyecto
```bash
git clone https://github.com/tuusuario/desafio-personas.git
cd desafio-personas
```

### 2. Compilar y empaquetar con Maven
```bash
mvn clean install
```

### 3. Ejecutar el backend
```bash
mvn spring-boot:run
```
El servicio quedará disponible en:
👉 http://localhost:8080/personas

## Endpoints disponibles
### ➕ Crear persona
```http request
POST /personas
Content-Type: application/json
```
### Body ejemplo:
```json
{
  "rut": "12.345.678-9",
  "nombre": "Gonzalo",
  "apellido": "Lopez",
  "fechaNacimiento": "1990-08-20",
  "direccion": {
    "calle": "Berta Correa 1994",
    "comuna": "Huechuraba",
    "region": "Metropolitana"
  }
}
```
### Listar personas
```http
GET /personas
```
### Buscar persona por ID
```http
GET /personas/{id}
```
### Actualizar persona
```http
PUT /personas/{id}
Content-Type: application/json
```
### Eliminar persona
```http
DELETE /personas/{id}
```

## Validaciones implementadas

* @NotBlank para campos obligatorios (rut, nombre, apellido).
* @Past para asegurar que la fecha de nacimiento sea anterior a la actual.
* @Embedded + @Valid en la dirección (calle, comuna, region).
* Cálculo automático de edad con @Transient.

## Manejo de errores
### Implementado mediante GlobalExceptionHandler:
* 400 Bad Request → errores de validación.
* 404 Not Found → persona no encontrada.
* 500 Internal Server Error → errores genéricos.
### Ejemplo de respuesta:
```json
{
  "nombre": "El nombre es obligatorio",
  "rut": "El RUT es obligatorio"
}
```
## Persistencia y base de datos
* Base de datos H2 en memoria (configurada automáticamente).
  * Accesible desde:
  👉 http://localhost:8080/h2-console
  JDBC URL: jdbc:h2:mem:testdb
  User: sa
  Password: (vacío)

## Supuestos y observaciones
* Se utiliza H2 por simplicidad, pero puede migrarse fácilmente a PostgreSQL u Oracle.
* El sistema maneja correctamente la validación y persistencia de datos.
* En caso de indisponibilidad de la BD, el servicio captura excepciones y responde con un mensaje controlado.
* El cálculo de edad se realiza automáticamente en base a la fecha de nacimiento.
* Código modular, documentado y validado según convenciones de Spring Boot y Java 17.
## Mejoras futuras

* Integración con una base de datos persistente (PostgreSQL/MySQL).
* Documentación automática con Swagger/OpenAPI.
* Tests unitarios con JUnit 5 y Mockito.
* Manejo de colas (RabbitMQ/Kafka) para reintento de persistencia en caso de caída de BD.