import { useEffect, useState } from "react";
import api from "../../api/axios";
import Table from "../../components/Table.jsx";
import Modal from "../../components/Modal.jsx";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    id_produk: "",
    nama_produk: "",
    satuan: "",
    jumlah: "",
  });

  const columns = [
    { header: "ID Produk", accessor: "id_produk" },
    { header: "Nama Produk", accessor: "nama_produk" },
    { header: "Satuan", accessor: "satuan" },
    { header: "Jumlah", accessor: "jumlah" },
  ];

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const canManageProduct = role === "owner" || role === "admin";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm({
      id_produk: "",
      nama_produk: "",
      satuan: "",
      jumlah: "",
    });
  }

  function handleOpenModal(type, product = null) {
    if (!canManageProduct) return;

    setOpenModal(type);
    setSelectedProduct(product);
    resetForm();
  }

  function handleCloseModal() {
    setOpenModal(null);
    setSelectedProduct(null);
    resetForm();
  }

  async function fetchProducts() {
    try {
      const res = await api.get("/products", config);
      setProducts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }

  async function handleCreateProduct(e) {
    e.preventDefault();

    try {
      await api.post(
        "/products",
        {
          id_produk: form.id_produk,
          nama_produk: form.nama_produk,
          satuan: form.satuan,
          jumlah: Number(form.jumlah),
        },
        config
      );

      alert("Produk berhasil ditambahkan");
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menambah produk");
    }
  }

  async function handleTransaction(e, type) {
    e.preventDefault();

    try {
      await api.post(
        "/transactions",
        {
          id_produk: selectedProduct.id_produk,
          tipe: type,
          jumlah: Number(form.jumlah),
        },
        config
      );

      alert(`Barang ${type} berhasil disimpan`);
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || `Gagal menyimpan barang ${type}`);
    }
  }

  async function handleDeleteProduct() {
    try {
      await api.delete(`/products/${selectedProduct.id_produk}`, config);

      alert("Produk berhasil dihapus");
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus produk");
    }
  }

  function getModalTitle() {
    if (openModal === "create") return "Tambah Produk";
    if (openModal === "masuk") return "Barang Masuk";
    if (openModal === "keluar") return "Barang Keluar";
    if (openModal === "delete") return "Hapus Produk";
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Produk</h1>

        {canManageProduct && (
          <button
            onClick={() => handleOpenModal("create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            + Tambah Produk
          </button>
        )}
      </div>

      <Table
        columns={columns}
        data={products}
        renderActions={
          canManageProduct
            ? (row) => (
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleOpenModal("masuk", row)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                  >
                    Masuk
                  </button>

                  <button
                    onClick={() => handleOpenModal("keluar", row)}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 cursor-pointer"
                  >
                    Keluar
                  </button>

                  <button
                    onClick={() => handleOpenModal("delete", row)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Hapus
                  </button>
                </div>
              )
            : null
        }
      />

      {openModal && canManageProduct && (
        <Modal title={getModalTitle()} onClose={handleCloseModal}>
          {openModal === "create" && (
            <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
              <input
                type="text"
                name="id_produk"
                placeholder="ID Produk"
                value={form.id_produk}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <input
                type="text"
                name="nama_produk"
                placeholder="Nama Produk"
                value={form.nama_produk}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <input
                type="text"
                name="satuan"
                placeholder="Satuan"
                value={form.satuan}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah Awal"
                value={form.jumlah}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Simpan Produk
              </button>
            </form>
          )}

          {openModal === "masuk" && (
            <form
              onSubmit={(e) => handleTransaction(e, "masuk")}
              className="flex flex-col gap-4"
            >
              <p>
                Produk: <b>{selectedProduct.nama_produk}</b>
              </p>

              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah Masuk"
                value={form.jumlah}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Simpan Barang Masuk
              </button>
            </form>
          )}

          {openModal === "keluar" && (
            <form
              onSubmit={(e) => handleTransaction(e, "keluar")}
              className="flex flex-col gap-4"
            >
              <p>
                Produk: <b>{selectedProduct.nama_produk}</b>
              </p>

              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah Keluar"
                value={form.jumlah}
                onChange={handleChange}
                className="border rounded px-4 py-2"
                required
              />

              <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                Simpan Barang Keluar
              </button>
            </form>
          )}

          {openModal === "delete" && (
            <div>
              <p className="mb-4">
                Yakin ingin menghapus produk{" "}
                <b>{selectedProduct.nama_produk}</b>?
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Hapus
                </button>

                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}