# scalable-web-app

# Scalable Web App – Authentication & Task Dashboard

A full-stack scalable web application with JWT authentication and a task dashboard built as part of a Frontend Developer Internship assignment.

## Live Demo
Frontend: https://scalable-web-app-gk9h-2a87e3w8k-debabratas-projects-36a4ccd0.vercel.app/  
Backend API: https://scalable-web-app-fn3l.onrender.com/api

---

#  Features

## Authentication
- User registration & login
- JWT-based authentication
- Password hashing (bcrypt)
- Protected routes (dashboard)
- Logout flow

##  Dashboard
- Fetch logged-in user profile
- CRUD operations on tasks
- Search & filter tasks
- Responsive UI

##  Frontend
- React + Vite
- TailwindCSS UI
- Axios API integration
- Form validation
- Protected routes

##  Backend
- Node.js + Express
- MongoDB database
- JWT middleware
- REST API architecture
- MVC structure

---

#  Project Structure
- frontend/
    src/
      components/
      pages/
      services/
      App.jsx

- backend/
    controllers/
    routes/
    middleware/
    server.js
  
- Readme.md

  #  Authentication Flow

1. User registers → password hashed with bcrypt  
2. User logs in → server returns JWT  
3. JWT stored in localStorage  
4. Protected routes verify token  
5. Dashboard fetches user + tasks  

---

#  API Endpoints

## Auth
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/profile  

## Tasks
GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

---

#  Database Schema

## User
- name
- email
- password (hashed)

## Task
- title
- description
- status
- userId

---

#  Setup Instructions

## Backend

```bash
cd backend
npm install
npm run dev
Create .env
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
Frontend
cd frontend
npm install
npm run dev
Create .env

VITE_API_URL=https://scalable-web-app-fn3l.onrender.com/api
 
 ## Security Practices
Password hashing using bcrypt
JWT authentication middleware
Protected API routes
Input validation
Error handling

## Scalability Approach (Production)
If scaling for production:
Frontend
- Deploy via CDN (Vercel)
- Code splitting
- Lazy loading routes
- Environment-based API config

Backend
- Stateless JWT auth
- Horizontal scaling (multiple instances)
- Load balancer
- Separate auth & task services
- Caching (Redis)

Database
- Indexed queries
- Connection pooling
- \Read replicas


  
  


