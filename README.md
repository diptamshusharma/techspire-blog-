# TechSphere - Technology Blog Platform

A simple full-stack university project: a technology blog where you can create, read, edit and delete blog posts.

- **Frontend:** React (Vite), React Router, one CSS file
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

Read `TechSphere_Study_Notes.txt` for a full explanation, viva questions and exercises.

## Folder structure

```
TechSphere/
├── frontend/   (React app, runs on http://localhost:5173)
└── backend/    (Express API, runs on http://localhost:5000)
```

## How to run

1. Install Node.js (LTS) from https://nodejs.org and MongoDB Community Server (or create a free MongoDB Atlas cluster).
2. Backend:
   ```
   cd backend
   npm install
   copy .env.example to .env  (then check MONGO_URI inside it)
   npm run dev
   ```
   You should see `Server running on http://localhost:5000` and `MongoDB connected`.
3. Frontend (in a second terminal):
   ```
   cd frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.

## API routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/blogs | Get all blog posts |
| GET | /api/blogs/:id | Get one blog post |
| POST | /api/blogs | Create a blog post |
| PUT | /api/blogs/:id | Update a blog post |
| DELETE | /api/blogs/:id | Delete a blog post |
