import { useState } from "react";
import api from "../../api/axios";

export default function EditAccount() {
  const [profileForm, setProfileForm] = useState({
    name_account: localStorage.getItem("name_account") || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function handleProfileChange(e) {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  }

  function handlePasswordChange(e) {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();

    try {
      await api.put("/auth/profile", profileForm, config);

      localStorage.setItem("name_account", profileForm.name_account);
      alert("Username berhasil diubah");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengubah username");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    try {
      await api.put("/auth/change-password", passwordForm, config);

      alert("Password berhasil diubah");

      setPasswordForm({
        old_password: "",
        new_password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengubah password");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Akun</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ubah Username</h2>

          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
            <input
              type="text"
              name="name_account"
              placeholder="Username"
              value={profileForm.name_account}
              onChange={handleProfileChange}
              className="border rounded px-4 py-2"
              required
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Simpan Username
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ubah Password</h2>

          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <input
              type="password"
              name="old_password"
              placeholder="Password Lama"
              value={passwordForm.old_password}
              onChange={handlePasswordChange}
              className="border rounded px-4 py-2"
              required
            />

            <input
              type="password"
              name="new_password"
              placeholder="Password Baru"
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              className="border rounded px-4 py-2"
              required
            />

            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Simpan Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}