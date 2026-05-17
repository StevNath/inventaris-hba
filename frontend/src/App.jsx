import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Layout from "./layout/MainLayout.jsx";
import ProtectedRoute from "../routes/ProtectedRoutes.jsx";
import RoleRoute from "../routes/RoleRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Product from "./pages/Product/product.jsx";
import Transaction from "./pages/Transaction/transaction.jsx";
import EditAccount from "./pages/Account/editAccount.jsx";
import CreateAccount from "./pages/Account/createAccount.jsx";


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
          <Route path="/account/edit" element={<EditAccount />} />
          <Route path="/account/create" element={<RoleRoute allowedRoles={["owner"]}><CreateAccount /></RoleRoute>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}