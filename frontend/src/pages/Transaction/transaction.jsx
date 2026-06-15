import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table.jsx";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [searchId, setSearchId] = useState("");

  const columns = [
    { header: "ID", accessor: "id_transaction" },
    { header: "Produk", accessor: "nama_produk" },
    { header: "Username", accessor: "name_account" },
    { header: "Tipe", accessor: "tipe" },
    { header: "Jumlah", accessor: "jumlah" },
    { header: "Stok Akhir", accessor: "stok_akhir" },
    { header: "Tanggal", accessor: "tanggal_wib" },
  ];

  function formatDateWIB(dateString) {
    return (
      new Date(dateString).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) + " WIB"
    );
  }

  async function fetchTransactions() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = res.data.map((item) => ({
        ...item,
        tanggal_wib: formatDateWIB(item.tanggal),
      }));

      setTransactions(formattedData);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  async function handleSearch() {
    try {
      if (!searchId) {
        fetchTransactions();
        return;
      }

      const token = localStorage.getItem("token");

      const res = await api.get(`/transactions/${searchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions([
        {
          ...res.data,
          tanggal_wib: formatDateWIB(res.data.tanggal),
        },
      ]);
    } catch (err) {
      alert("Transaksi tidak ditemukan");
      setTransactions([]);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Log Transaksi
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Cari ID Transaksi"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Cari
        </button>

        <button
          onClick={() => {
            setSearchId("");
            fetchTransactions();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
        >
          Reset
        </button>
      </div>

      <Table
        columns={columns}
        data={transactions}
      />
    </div>
  );
}