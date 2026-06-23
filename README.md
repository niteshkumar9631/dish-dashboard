# 🍽️ Dish Dashboard

A full-stack application to manage and display dish information with real-time updates. Built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io.

## 🔗 Live Demo

- **Frontend:** https://dish-dashboard-woad.vercel.app/
- **Backend API:** https://dish-dashboard-hals.onrender.com

## 📋 Features

- **Database** — MongoDB schema to store dishes (`dishId`, `dishName`, `imageUrl`, `isPublished`)
- **REST API**
  - `GET /api/dishes` — fetch all dishes
  - `PATCH /api/dishes/:id/toggle` — toggle a dish's published status
  - `POST /api/dishes` — add a new dish
- **Frontend Dashboard** — React dashboard displaying all dishes with images, status badges, and toggle buttons
- **Real-Time Updates (Bonus)** — Using **Socket.io** + **MongoDB Change Streams**, the dashboard updates instantly whenever a dish is changed — whether through the dashboard itself, Postman, or directly in the database (Atlas).

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, Socket.io
**Frontend:** React.js (Vite), Tailwind CSS v4, Axios, Socket.io-client
**Deployment:** Render (backend), Vercel (frontend)

## 📂 Project Structure

```
dish-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   └── Dish.js           # Dish schema
│   ├── routes/
│   │   └── dishRoutes.js     # GET, PATCH, POST APIs
│   ├── seed.js                # Seeds sample dish data
│   ├── server.js              # Express + Socket.io + Change Streams
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DishCard.jsx
    │   │   └── AddDishForm.jsx
    │   ├── api.js              # Axios API calls
    │   ├── socket.js            # Socket.io client connection
    │   └── App.jsx
    └── .env.example
```

## ⚙️ How Real-Time Updates Work

1. MongoDB **Change Streams** watch the `dishes` collection for any insert/update/delete — whether it happened through our API or directly in the database.
2. When a change is detected, the backend emits a **Socket.io** event (`dishUpdated`, `dishInserted`, `dishDeleted`) to all connected clients.
3. The React frontend listens for these events and updates its state instantly — no page refresh needed.

## 🚀 Running Locally

### Backend
```bash
cd backend
npm install
# create a .env file (see .env.example) with MONGO_URI and PORT
npm run seed   # populates the database with sample dishes
npm run dev    # starts server on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
# create a .env file (see .env.example) with VITE_API_URL=http://localhost:5000
npm run dev    # starts on http://localhost:5173
```

## 📡 API Reference

| Method | Endpoint                  | Description                  |
|--------|----------------------------|-------------------------------|
| GET    | `/api/dishes`              | Get all dishes                |
| POST   | `/api/dishes`               | Add a new dish                |
| PATCH  | `/api/dishes/:id/toggle`    | Toggle a dish's publish status|

## 👤 Author

**Nitesh Kumar Gond**
