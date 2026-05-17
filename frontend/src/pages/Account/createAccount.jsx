import { useState } from "react";
import api from "../../api/axios";

export default function CreateAccount() {
  const [form, setForm] = useState({
    name_account: "",
    password: "",
    role_id: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/auth/register",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        `Akun berhasil dibuat (${res.data.account_code})`
      );

      setError("");

      setForm({
        name_account: "",
        password: "",
        role_id: "",
      });

    } catch (err) {
      setMessage("");

      setError(
        err.response?.data?.message ||
        "Terjadi kesalahan"
      );
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Manajemen Akun
      </h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          Tambah Akun
        </h2>

        {/* Success */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              Nama Akun
            </label>

            <input
              type="text"
              name="name_account"
              value={form.name_account}
              onChange={handleChange}
              placeholder="Masukkan nama akun"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Role
            </label>

            <select
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Pilih Role</option>
              <option value="1">Owner</option>
              <option value="2">Admin</option>
              <option value="3">Auditor</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer"
          >
            Simpan Akun
          </button>
        </form>
      </div>
    </div>
  );
}