# 🚀 HandsOn: A Volunteering Event Platform

## 📌 Project Overview

HandsOn is a web application that helps users to manage volunteers, events, and participation records efficiently. Users can sign up, participate in events, and track their contributions, and also can create, edit, and manage events.

## 🛠 Technologies Used

- **Frontend:** React.js, Tailwind CSS, React Hook Form, React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)
- **State Management:** React Context API
- **UI Components:** ShadCN UI
- **API Handling:** Axios

## ✨ Features

- 🔹 User authentication (Signup, Login, Logout)
- 🔹 Profile management (Edit profile, update skills & avatar)
- 🔹 Event CRUD (Create, Read, Update, Delete events)
- 🔹 Volunteer event participation tracking

## 🔧 Setup Instructions

Clone the repository:

```bash
git clone https://github.com/yourusername/volunteer-management.git
```

Install dependencies both fontend and backend:

```bash
cd frontend && bun install
cd backend && npm install
```

Configure environment variables:
Create a .env.development.local file in the backend directory and add the following:

```js
PORT=
NODE_ENV=development
DB_URI=
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
```

Configure environment variables:
Create a .env.local file in the frontend directory and add the following:

```js
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Run the backend server:

```
npm run dev
```

Run the frontend:

```bash
cd frontend
bun run dev
```

**Thank you. Feel free to star the repo.**
