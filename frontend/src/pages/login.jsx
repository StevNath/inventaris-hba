import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    account_code: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      alert("Kode akun atau password salah");
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-xl p-6 text-center flex flex-col gap-4 w-80"
      >
        <h1 className="text-3xl font-extrabold">Login</h1>

        <input
          type="text"
          placeholder="Kode Akun"
          value={form.account_code}
          onChange={(e) =>
            setForm({ ...form, account_code: e.target.value })
          }
          className="border-2 border-gray-300 rounded-md px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="border-2 border-gray-300 rounded-md px-4 py-2"
        />

        <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}