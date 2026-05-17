import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name_account: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name_account", res.data.user.name_account);

      navigate("/dashboard");
    } catch (err) {
      alert("Nama akun atau password salah");
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
          placeholder="Nama Akun"
          value={form.name_account}
          onChange={(e) =>
            setForm({ ...form, name_account: e.target.value })
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