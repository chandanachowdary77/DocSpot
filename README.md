# 🏥 Doctor Appointment Booking System (MERN Stack)

A full-stack web application for booking doctor appointments, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 📁 Project Structure
```
code/
├── backend/       # Node.js + Express + MongoDB API
└── frontend/      # React.js frontend
```

## 🚀 Features
- User Registration & Login with JWT
- Role-based dashboards (Admin, User, Doctor)
- Book & manage appointments
- Doctor application and approval system
- Admin panel to manage users and doctors
- Notifications and authentication middleware

## ✅ Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git (optional)

## 🔧 Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm start
```

## 💻 Frontend Setup
```bash
cd frontend
npm install
npm start
```

Runs on: [http://localhost:3000](http://localhost:3000)

## 🌐 API & Routes Overview
- `/api/user/*` — User authentication & operations
- `/api/admin/*` — Admin management
- `/api/doctor/*` — Doctor-related operations

## 📚 Technologies Used
- **Frontend:** React.js, Axios, Bootstrap, React Router
- **Backend:** Node.js, Express.js, JWT, Mongoose
- **Database:** MongoDB
- **Others:** dotenv, bcryptjs, middleware


