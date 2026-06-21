# SafeHer – Smart Campus Safety Platform

## Project Title
SafeHer – Smart Safety and Support Platform for Female University Students

## Problem Statement
Female university students may face unsafe situations, poor lighting areas, transport concerns, harassment, or other campus safety issues. Many students also hesitate to report incidents due to fear, lack of privacy, or unclear reporting channels. SafeHer provides a simple digital platform to report issues, send emergency alerts, and track report progress.

## Solution Overview
SafeHer is a full-stack web application that allows students to register, log in, submit emergency alerts, submit anonymous complaints, and view only their own submitted reports. Admin users can monitor all alerts and complaints through a separate admin dashboard.

## Key Features
- Student registration and login
- JWT-based authentication
- Emergency alert submission
- Anonymous complaint submission
- Student-only My Reports page
- Admin dashboard for monitoring reports
- Admin alert and complaint management
- Safety assistant page
- Responsive modern UI

## Technologies Used
### Frontend
- React
- Vite
- CSS
- Lucide React
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt.js
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Architecture Diagram

Student / Admin User  
↓  
React Frontend hosted on Vercel  
↓  
Express.js Backend API hosted on Render  
↓  
MongoDB Atlas Database  

## Deployment URL
Frontend: https://safeher-woad.vercel.app

Backend API: https://safeher-q82n.onrender.com

## Test Accounts

### Student Account
Email: student@test.com  
Password: 123456  

### Admin Account
Email: admin@safeher.com  
Password: admin123  

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev