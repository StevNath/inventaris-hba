# Inventaris HBA

A modern and responsive inventory management system for HBA.

## 📋 Project Description

**Inventaris HBA** is a full-stack web application designed to manage inventory easily and efficiently. The application is equipped with authentication features, data management, and a user-friendly interface.

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework for Node.js
- **MySQL2** - Relational database
- **JWT** - Token-based authentication
- **Bcrypt** - Password encryption
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables management

### Frontend
- **React 19** - UI library
- **Vite** - Modern build tool
- **React Router** - Navigation and routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **ESLint** - Code quality tool

## 📁 Project Structure

```
inventaris-hba/
├── backend/           # Node.js Express server
│   ├── package.json
│   └── ...
├── frontend/          # React + Vite application
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md         # Documentation file
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventaris_hba
JWT_SECRET=your_secret_key
```

4. Run the server:
```bash
npm start
```

The server will run at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (if needed):
```env
VITE_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. For production build:
```bash
npm run build
```

The application will run at `http://localhost:5173`

## 🔑 Key Features

- ✅ User authentication with JWT
- ✅ Password encrypted with Bcrypt
- ✅ CORS support for cross-domain communication
- ✅ Structured MySQL database
- ✅ Responsive interface with Tailwind CSS
- ✅ Page navigation with React Router

## 📊 API Endpoints (Example)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/inventory` | Get inventory list |
| POST | `/api/inventory` | Add inventory item |
| PUT | `/api/inventory/:id` | Update inventory item |
| DELETE | `/api/inventory/:id` | Delete inventory item |

*Adjust according to your actual endpoints*

## 🔒 Security

- Passwords are hashed using Bcrypt
- Authentication using JWT tokens
- CORS configured for security
- Environment variables for sensitive information

## 📝 Scripts

### Backend
```bash
npm start   # Run the server
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Created by:** [StevNath](https://github.com/StevNath)

**Last Updated:** 2026-06-10
