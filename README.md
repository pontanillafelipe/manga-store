# Manga Store

Aplicación fullstack para la compra de mangas online.

## Tecnologías

**Frontend**
- React + Vite

**Backend**
- Java + Spring Boot
- Spring Data JPA
- MySQL

## Funcionalidades

- Listado de mangas
- Búsqueda por título
- Carrito de compras
- Creación de órdenes

## Requisitos previos

- Node.js 18+
- Java 17+
- MySQL 8+

## Cómo ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/pontanillafelipe/manga-store.git
```

### 2. Configurar la base de datos

Importar el schema incluido en el proyecto:

```bash
mysql -u tu_usuario -p manga_store < database/schema.sql
```

Luego configurar las credenciales en `manga-store/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/manga_store
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### 3. Backend

```bash
cd manga-store
./mvnw spring-boot:run
```

### 4. Frontend

```bash
cd manga-store-frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

## Estructura del proyecto
