import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}