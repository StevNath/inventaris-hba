import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    roles: ["owner", "admin", "auditor"],
  },
  {
    name: "Produk",
    path: "/product",
    roles: ["owner", "admin", "auditor"],
  },
  {
    name: "Transaksi",
    path: "/transaction",
    roles: ["owner", "admin", "auditor"],
  },
  {
    name: "Edit Akun",
    path: "/account/edit",
    roles: ["owner", "admin", "auditor"],
  },
  {
    name: "Buat Akun",
    path: "/account/create",
    roles: ["owner"],
  }
];

export default function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
    window.location.reload();
  }

  return (
    <aside className="w-64 h-screen bg-blue-900 text-white p-4 flex flex-col">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Inventaris HBA
        </h1>

        <nav className="space-y-2">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 rounded px-4 py-2 cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
}