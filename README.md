# Inventaris HBA

Inventaris HBA is a full-stack inventory management application built to help manage products, transactions, and inventory prediction more efficiently.

## Overview

This repository contains three main parts:
- **backend/**: Express.js + MySQL2 API for authentication, products, transactions, and predictions
- **frontend/**: React 19 + Vite user interface
- **backend/model/**: Machine learning assets and dependencies for inventory prediction

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

## Project Structure

```text
inventaris-hba/
├── backend/
│   ├── model/
│   │   ├── saved_model/
│   │   │   └── model.pkl
│   │   ├── predict.py
│   │   └── requirements.txt
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json
│   └── ...
└── README.md
```

## Local Setup

### 1) Backend

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventaris_hba
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm start
```

> Note: make sure a `start` script exists in `backend/package.json`. At the moment, that file still contains only the default `test` script.

### 2) Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### 3) Machine Learning Model

Go to the machine learning folder inside backend:

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

Run a prediction test (if the script supports JSON input in this format):

```bash
python predict.py '{"product_id": 1, "previous_inventory": 100, "units_sold": 50, "units_ordered": 30}'
```

## Key Features

- User authentication with JWT
- Password hashing with Bcrypt
- Product and transaction management
- Role-based access control
- Modern React frontend with Tailwind CSS
- Machine learning-based inventory prediction

## API Endpoints

> The endpoints below follow the previous documentation and may need to be adjusted if the backend implementation has changed.

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

- Do not commit `.env` files to the repository.
- Make sure MySQL and all environment variables are configured before running the app.
- If you want, I can also make this README fully reflect the latest actual file structure by checking the backend and frontend source files in detail.

## Project Info

- **Owner:** [StevNath](https://github.com/StevNath)
- **Repository:** [StevNath/inventaris-hba](https://github.com/StevNath/inventaris-hba)
- **Last updated:** 2026-07-19
