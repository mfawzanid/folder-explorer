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

### Creating Items
To create a new folder or file item, you can:
- Use the Postman collection attached in the repository  
- Or send a `curl` request like this:

```bash
curl --location 'localhost:3000/items' \
--header 'Content-Type: application/json' \
--data '{
    "name": "file_1.1",
    "type": "file", // or "folder"
    "parentId": "518ef605-d289-4b63-aed3-c7d177b71881"
}'
```

Notes:
- To create a root folder, simply omit the `parentId` or set it to `null`.
- For files, you must provide a valid `parentId`.

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
