# Inventaris HBA

A modern and responsive inventory management system for HBA with predictive analytics capabilities.

## 📋 Project Description

**Inventaris HBA** is a full-stack web application designed to manage inventory easily and efficiently. The application is equipped with authentication features, data management, predictive analytics, and a user-friendly interface. Built with modern technologies for optimal performance and user experience.

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

### Machine Learning / Prediction
- **Python** - Programming language
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Joblib** - Model serialization

## 📁 Project Structure

```
inventaris-hba/
├── backend/                      # Node.js Express server
│   ├── controllers/              # Business logic controllers
│   │   ├── authController.js     # Authentication controller
│   │   ├── productController.js  # Product management
│   │   ├── transactionController.js  # Transaction handling
│   │   └── predictionController.js   # Prediction logic
│   ├── routes/                   # API route definitions
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   ├── transactionRoutes.js  # Transaction endpoints
│   │   └── predictionRoutes.js   # Prediction endpoints
│   ├── middleware/               # Express middleware
│   │   ├── auth.js               # JWT authentication middleware
│   │   └── role.js               # Role-based access control
│   ├── config/                   # Configuration files
│   ├── package.json              # Backend dependencies
│   ├── server.js                 # Server entry point
│   └── .env                      # Environment variables (local)
│
├── frontend/                     # React + Vite application
│   ├── src/                      # Source code
│   ├── routes/                   # Page routing
│   ├── public/                   # Static assets
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint rules
│   ├── index.html                # HTML entry point
│   └── .env                      # Environment variables (local)
│
├── model/                        # Machine Learning Model
│   ├── saved_model/              # Trained model files
│   │   └── model.pkl             # Serialized model
│   ├── predict.py                # Prediction script
│   ├── requirements.txt          # Python dependencies
│   └── .gitignore
│
└── README.md                     # Documentation file
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server
- Python 3.8+ (for prediction model)

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

### Machine Learning Model Setup

1. Navigate to the model directory:
```bash
cd model
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Verify the model is in place:
```bash
ls saved_model/model.pkl
```

4. Test predictions (optional):
```bash
python predict.py '{"product_id": 1, "previous_inventory": 100, "units_sold": 50, "units_ordered": 30}'
```

## 🔑 Key Features

- ✅ User authentication with JWT
- ✅ Password encrypted with Bcrypt
- ✅ CORS support for cross-domain communication
- ✅ Structured MySQL database
- ✅ Responsive interface with Tailwind CSS
- ✅ Page navigation with React Router
- ✅ Inventory prediction using Machine Learning
- ✅ Product management (CRUD operations)
- ✅ Transaction tracking
- ✅ Role-based access control

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Add new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Predictions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predictions` | Generate inventory prediction |

## 🔒 Security

- Passwords are hashed using Bcrypt
- Authentication using JWT tokens
- CORS configured for security
- Environment variables for sensitive information
- Role-based access control middleware
- Request validation and sanitization

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

### Model
```bash
python predict.py '<json_input>'  # Run prediction
```

## 🧠 ML Model Details

The prediction model uses a trained machine learning model to forecast inventory levels based on:
- Product ID
- Previous inventory
- Units sold
- Units ordered

**Model Type:** Scikit-learn based model  
**Input Format:** JSON with feature fields  
**Output:** Predicted inventory levels

## 👤 Project Info

**Created by:** [StevNath](https://github.com/StevNath)

**Last Updated:** 2026-06-10
**Readme Generated by Copilot**
---

**Note:** Make sure all environment variables are properly configured before running the application. Never commit `.env` files to version control.
