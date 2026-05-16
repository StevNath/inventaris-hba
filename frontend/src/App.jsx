import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import Layout from "./layout/MainLayout.jsx";
import ProtectedRoute from "../routes/ProtectedRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./pages/Product/product.jsx";
import Transaction from "./pages/Transaction/transaction.jsx";
import Account from "./pages/Account/account.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/account" element={<Account />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}