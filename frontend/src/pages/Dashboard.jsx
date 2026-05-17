import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Table from "../components/Table.jsx";

export default function Dashboard() {
  const [predictions, setPredictions] = useState([]);

  const columns = [
    { header: "ID Produk", accessor: "id_produk" },
    { header: "Nama Produk", accessor: "nama_produk" },
    { header: "Stok Sekarang", accessor: "stok_sekarang" },
    { header: "Total Masuk", accessor: "total_masuk" },
    { header: "Total Keluar", accessor: "total_keluar" },
    { header: "Prediksi Stok Besok", accessor: "prediksi_stok" },
    { header: "Status", accessor: "status" },
  ];

  async function fetchPredictions() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPredictions(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    fetchPredictions();
  }, []);

  const totalProduk = predictions.length;
  const stokRendah = predictions.filter(
    (item) => item.status === "Stok Rendah"
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500">Total Produk</h2>
          <p className="text-3xl font-bold">{totalProduk}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500">Produk Stok Rendah</h2>
          <p className="text-3xl font-bold">{stokRendah}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-gray-500">Status Sistem</h2>
          <p className="text-3xl font-bold">Aktif</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Prediksi Stok Produk
        </h2>
        <p className="text-gray-500">
          Menampilkan prediksi stok berdasarkan rekap transaksi harian terakhir.
        </p>
      </div>

      <Table columns={columns} data={predictions} />
    </div>
  );
}