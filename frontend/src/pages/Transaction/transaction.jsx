import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table.jsx";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);

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
    return new Date(dateString).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " WIB";
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Log Transaksi
      </h1>

      <Table
        columns={columns}
        data={transactions}
      />
    </div>
  );
}