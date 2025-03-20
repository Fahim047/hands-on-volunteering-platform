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

## Database Diagram

[![](https://mermaid.ink/img/pako:eNqVVF1vmzAU_SuWn9MIkvAR3qZ1UvewTlq7ly3T5OI78Ao2vTZpWZr_PhMIocVSU4QQPj73-twv72iqONCEAl4KliErN5LY57sGJM_PFxdqRz5tQRqSkA1NEZgBTZh9a5Mr3NARfa9e0ZkxILl-Qep9XkFRfYOHGvQ5nnujj6os35Qy9uywy9mg5wi7WQShKgQM7JGcXfffPl_v_kJqPnPyW_ATemNQyIxIVsIEhJKJYoJWTOtHhRMfP38RfS-KQjs2hDSANszJHmFbZhie4Ou6vLO6K2VNRuwPiKwhW1XU1hPgldBGYdPt78dRdyV9M-wB7SvyWpYRppgmhINOUVRGKDm1yK1y-SJhl7bshNvPhKxtzOZWuHIuuRMvVMqc51oYsiEX49hs3ru2BtCOTI2779w2eX9aasxAps0ZmR_JTrv-dqk-tv75Fc5Pcb6j_vDkYlcM7eG9Bqf04yh2yumMloB2jLi9tw6SN9TkYOtL29nlDO_boW15Voi6aWRKE4M1zCiqOstp8ocV2q7qqu2j_t47Uiomfyg1LIELOxRfukvycFceKDTZ0SeaLKJ4vgyiYO0vPC8M16sZbWjiz-NV7PlRHCyj0PeiMNjP6L-DU2--Xi-jIPRX3iJuzYL9f2OasIg?type=png)](https://mermaid.live/edit#pako:eNqVVF1vmzAU_SuWn9MIkvAR3qZ1UvewTlq7ly3T5OI78Ao2vTZpWZr_PhMIocVSU4QQPj73-twv72iqONCEAl4KliErN5LY57sGJM_PFxdqRz5tQRqSkA1NEZgBTZh9a5Mr3NARfa9e0ZkxILl-Qep9XkFRfYOHGvQ5nnujj6os35Qy9uywy9mg5wi7WQShKgQM7JGcXfffPl_v_kJqPnPyW_ATemNQyIxIVsIEhJKJYoJWTOtHhRMfP38RfS-KQjs2hDSANszJHmFbZhie4Ou6vLO6K2VNRuwPiKwhW1XU1hPgldBGYdPt78dRdyV9M-wB7SvyWpYRppgmhINOUVRGKDm1yK1y-SJhl7bshNvPhKxtzOZWuHIuuRMvVMqc51oYsiEX49hs3ru2BtCOTI2779w2eX9aasxAps0ZmR_JTrv-dqk-tv75Fc5Pcb6j_vDkYlcM7eG9Bqf04yh2yumMloB2jLi9tw6SN9TkYOtL29nlDO_boW15Voi6aWRKE4M1zCiqOstp8ocV2q7qqu2j_t47Uiomfyg1LIELOxRfukvycFceKDTZ0SeaLKJ4vgyiYO0vPC8M16sZbWjiz-NV7PlRHCyj0PeiMNjP6L-DU2--Xi-jIPRX3iJuzYL9f2OasIg)

## API Documentation

Below is a comprehensive table of all API endpoints available in the application:

## Authentication Endpoints

| Method | Endpoint        | Description                     | Authentication Required |
| ------ | --------------- | ------------------------------- | ----------------------- |
| POST   | `/auth/sign-up` | Register a new user             | No                      |
| POST   | `/auth/sign-in` | Login with existing credentials | No                      |

## Help Request Endpoints

| Method | Endpoint                      | Description                         | Authentication Required |
| ------ | ----------------------------- | ----------------------------------- | ----------------------- |
| GET    | `/help-requests`              | Get all help requests               | No                      |
| POST   | `/help-requests`              | Create a new help request           | Yes                     |
| GET    | `/help-requests/:id`          | Get a specific help request by ID   | No                      |
| GET    | `/help-requests/:id/comments` | Get all comments for a help request | No                      |
| POST   | `/help-requests/:id/comments` | Add a comment to a help request     | Yes                     |

## Event Endpoints

| Method | Endpoint            | Description                            | Authentication Required |
| ------ | ------------------- | -------------------------------------- | ----------------------- |
| GET    | `/events`           | Get all events                         | No                      |
| POST   | `/events`           | Create a new event                     | Yes                     |
| GET    | `/events/my-events` | Get events created by the current user | Yes                     |
| PATCH  | `/events/:id`       | Update a specific event                | Yes                     |
| DELETE | `/events/:id`       | Delete a specific event                | Yes                     |
| PATCH  | `/events/:id/join`  | Join an event as an attendee           | Yes                     |

## Comment Endpoints

| Method | Endpoint              | Description              | Authentication Required |
| ------ | --------------------- | ------------------------ | ----------------------- |
| POST   | `/comments/:id/reply` | Add a reply to a comment | Yes                     |

**Thank you. Feel free to star the repo.**
