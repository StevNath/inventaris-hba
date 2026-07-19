# Inventaris HBA

Inventaris HBA is a full-stack inventory management application designed to manage products, transactions, and inventory prediction more efficiently.

## Overview

This repository is organized into three main parts:

- **backend/**: Express.js + MySQL2 API for authentication, products, transactions, and predictions
- **frontend/**: React 19 + Vite web interface
- **backend/model/**: Python machine learning assets for inventory prediction

## Tech Stack

### Backend
- Express.js
- MySQL2
- JSON Web Token (JWT)
- Bcrypt
- CORS
- Dotenv

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS v4
- ESLint

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy
- Joblib

## Updated Project Structure

```text
inventaris-hba/
├── .vscode/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   │   ├── saved_model/
│   │   ├── .gitignore
│   │   ├── predict.py
│   │   └── requirements.txt
│   ├── routes/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── routes/
│   ├── src/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── README.md
```

## Local Setup

### 1) Backend

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventaris_hba
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm start
```

> Note: Ensure a `start` script exists in `backend/package.json`.

### 2) Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

### 3) Machine Learning Model

Go to the machine learning folder:

```bash
cd backend/model
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Check that the model file exists:

```bash
ls saved_model/model.pkl
```

Run a prediction test (if `predict.py` supports this JSON input format):

```bash
python predict.py '{"product_id": 1, "previous_inventory": 100, "units_sold": 50, "units_ordered": 30}'
```

## Key Features

- JWT-based user authentication
- Password hashing with Bcrypt
- Product and transaction management
- Role-based access control
- Modern React frontend with Tailwind CSS
- Machine learning-based inventory prediction

## API Endpoints

> Endpoints may need adjustments if backend implementation changes.

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Transactions
- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

### Predictions
- `POST /api/predictions`

## Important Notes

- Do not commit `.env` files.
- Make sure MySQL and all required environment variables are configured before running the app.

## Project Info

- **Owner:** [StevNath](https://github.com/StevNath)
- **Repository:** [StevNath/inventaris-hba](https://github.com/StevNath/inventaris-hba)
- **Last updated:** 2026-07-19
