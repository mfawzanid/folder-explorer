# Folder Explorer
A simple web-based folder viewer.

- The left panel shows the full folder tree.
- The right panel shows direct subfolders and files of the selected folder.
- Folders can have unlimited nested levels.
- Data is fetched from the backend on load and when folders are clicked.web-based folder viewer.

## Getting Started

### Run the app

```bash
docker compose up --build
```

This will start:

- **Client** at [http://localhost:8080](http://localhost:8080)  
- **API Server** at [http://localhost/api](http://localhost/api)  
- **PostgreSQL Database**

Note: It runs the database migration automatically.

---

### Reset the Database

If you want to delete all data in database you can:

```bash
docker compose down --volumes
```

## Tech Stack

**Backend:**
- Express
- TypeScript
- PostgreSQL
- Prisma ORM

**Frontend:**
- Vue 3
- Vite
- Axios

**Infrastructure:**
- Docker
- Docker Compose
- NGINX (reverse proxy)
