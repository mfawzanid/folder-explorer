## Folder Explorer - API Server
It provides a RESTful API for managing a hierarchical structure of folders and files. It stored in a PostgreSQL database and accessed using Prisma ORM.

## Tech Stack

- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Docker Compose

### Database Schema

| Column       | Type           | Constraints                                                | Description             |
|--------------|----------------|------------------------------------------------------------|-------------------------|
| `id`         | `text`         | Primary key                               | Unique identifier                        |
| `name`       | `text`         | Not null                                  | The display name of the item             |
| `type`       | `ItemType`     | Enum (`folder`, `file`), not null         | Type of the item                         |
| `parent_id`  | `text`         | Nullable                                  | References the parent folder’s `id`      |
| `createdAt`  | `timestamp(3)` | Default: `CURRENT_TIMESTAMP`, not null    | Timestamp when the item was created      |
| `updatedAt`  | `timestamp(3)` | Default: `CURRENT_TIMESTAMP`, not null    | Timestamp when the item was last updated |                                             |

### API Endpoints

```
POST   /items       : Create an item
GET    /items       : Get items (query: type=folder|file)
GET    /items/:id   : Get an item by ID (with children)
```

### Run the server

To run the database and API server:

```bash
docker compose up --build
```

To reset the database:

```bash
docker compose down --volumes
```

### 🌍 Ports

- API server: `http://localhost:3000`
- PostgreSQL DB: `http://localhost:5432`