# Backend App - API de Equipos, Jugadores y Partidos

Esta API expone endpoints para gestionar y consultar equipos, jugadores y partidos. Incluye filtros por nombre, liga y equipo usando coincidencia por "contiene" (LIKE "%valor%").

## Configuración del entorno (.env)

Crea un archivo `.env` en la raíz de `backend-app` con las variables de conexión a MySQL y el puerto del servidor.

```env
# Servidor
PORT=4000
JWT_SECRET=tu_secreto_opcional

# Base de datos MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=tu_base_de_datos
```

- `PORT`: Puerto donde corre la API (por defecto 4000).
- `JWT_SECRET`: Clave opcional para autenticación (si se usa en el futuro).
- `MYSQL_*`: Credenciales y datos de conexión a tu MySQL.

## Cómo correr la API

1. Instalar dependencias

```bash
npm install
```

2. Levantar el servidor (desarrollo)

```bash
npm run dev
```

3. Base URL

```
http://localhost:PORT/api
```

Ejemplo con puerto por defecto: `http://localhost:4000/api`

---

## Endpoints

### Equipos (`/api/equipos`)

- `GET /` — Lista todos los equipos
- `GET /:id` — Obtiene un equipo por `id`
- `POST /` — Inserta un equipo (body JSON)
- `PUT /` — Actualiza un equipo (body JSON con `id`)
- `DELETE /:id` — Elimina un equipo por `id`

Filtros:

- `GET /nombre/:nombre` — Busca equipos cuyo `nombre` contenga el texto
  - Ej.: `/api/equipos/nombre/barc` → "Barcelona", "Barclays FC"
- `GET /liga/:liga` — Busca equipos cuya `liga` contenga el texto
  - Ej.: `/api/equipos/liga/la` → "LaLiga", "Lagos Premier"

### Jugadores (`/api/jugadores`)

- `GET /` — Lista todos los jugadores
- `GET /:id` — Obtiene un jugador por `id`
- `POST /` — Inserta un jugador (body JSON)
- `PUT /` — Actualiza un jugador (body JSON con `id`)
- `DELETE /:id` — Elimina un jugador por `id`

Filtros:

- `GET /nombre/:nombre` — Busca jugadores cuyo `nombre` contenga el texto
  - Ej.: `/api/jugadores/nombre/l` → "Robert Lewandowski", "Louis Kelly"
- `GET /equipo/:equipo` — Busca jugadores cuyo `equipo` contenga el texto
  - Ej.: `/api/jugadores/equipo/barc` → jugadores de equipos con "barc" en el nombre

### Partidos (`/api/partidos`)

- `GET /` — Lista todos los partidos
- `GET /:id` — Obtiene un partido por `id`
- `POST /` — Inserta un partido (body JSON)
- `PUT /` — Actualiza un partido (body JSON con `id`)
- `DELETE /:id` — Elimina un partido por `id`

Filtros:

- `GET /liga/:liga` — Busca partidos cuya `liga` contenga el texto
  - Ej.: `/api/partidos/liga/la` → partidos de ligas con "la"
- `GET /equipo/:nombreEquipo` — Busca partidos donde `equipo1` o `equipo2` contenga el texto
  - Ej.: `/api/partidos/equipo/barc` → partidos con "Barcelona", etc.
- `GET /fecha/:fechaInicio/:fechaFin` — Rango de fechas (incluye ambos extremos)
  - Formato: `YYYY-MM-DD`
  - Ej.: `/api/partidos/fecha/2025-01-01/2025-01-31`

---

## Notas de uso

- Todos los filtros usan coincidencia por "contiene": `LIKE '%valor%'`.
- Asegúrate de que las columnas existen en tu BD:
  - `equipos`: `nombre`, `liga`
  - `jugadores`: `nombre`, `equipo`
  - `partidos`: `liga`, `equipo1`, `equipo2`, `fecha`
- Si tus columnas tienen otros nombres, actualiza los controladores en `src/modulos/*/controlador.js`.

## Ejemplos rápidos (Postman)

- Equipos por nombre: `GET http://localhost:4000/api/equipos/nombre/barc`
- Jugadores por equipo: `GET http://localhost:4000/api/jugadores/equipo/barc`
- Partidos por rango de fechas: `GET http://localhost:4000/api/partidos/fecha/2025-01-01/2025-01-31`
