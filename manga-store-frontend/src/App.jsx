import { useEffect, useState, useContext } from "react";
import MangaCard from "./components/MangaCard";
import Footer from "./components/Footer";
import { CartContext } from "./context/CartContext";
import Navbar from "./components/Navbar";
import MenuBar from "./components/MenuBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import MangaDetail from "./pages/MangaDetail";
import AdminMangas from "./pages/AdminMangas";
import CreateManga from "./pages/CreateManga";
import EditManga from "./pages/EditManga";
import CartPage from "./pages/CartPage";
import Banner from "./components/Banner";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GenreSection from "./components/GenreSection";
import MangaCarousel from "./components/MangaCarousel";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Catalog from "./pages/Catalog";
import Register from "./pages/Register";
import {
  getMangas,
  getPresaleMangas,
  getNewMangas,
  getBestSellerMangas,
} from "./services/mangaService";
import "./App.css";

function App() {
  const [mangas, setMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [newMangas, setNewMangas] = useState([]);
  const [bestSellerMangas, setBestSellerMangas] = useState([]);
  const [presaleMangas, setPresaleMangas] = useState([]);

  const PAGE_SIZE = 12;
  const [search, setSearch] = useState("");

  const { cart } = useContext(CartContext);

  const fetchMangas = async (page = currentPage) => {
    const data = await getMangas(page, PAGE_SIZE);

    console.log(data);

    if (Array.isArray(data)) {
      setMangas(data);
    } else {
      setMangas(data.content);
      setCurrentPage(data.number);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchMangas(0);
    loadHomeCarousels();
  }, []);

  const handleSearch = (title) => {
    setSearch(title);

    if (!title.trim()) {
      navigate("/catalogo");
      return;
    }

    navigate(`/catalogo?search=${encodeURIComponent(title.trim())}`);
  };

  const loadHomeCarousels = async () => {
    setNewMangas(await getNewMangas());

    setBestSellerMangas(await getBestSellerMangas());

    setPresaleMangas(await getPresaleMangas());
  };

  return (
    <>
      <div className="top-line"></div>

      <div className="main-container">
        <Navbar search={search} setSearch={setSearch} onSearch={handleSearch} />

        <ScrollToTop />

        <Banner />

        <MenuBar />

        <Routes>
          <Route
            path="/"
            element={
              <div style={{ padding: "20px" }}>
                <GenreSection />

                <MangaCarousel
                  title="🔥 Novedades 🔥"
                  mangas={newMangas}
                  link="/catalogo/nuevos"
                />

                <MangaCarousel
                  title="📚 Más vendidos 📚"
                  mangas={bestSellerMangas}
                  link="/catalogo/mas-vendidos"
                />

                <MangaCarousel
                  title="⭐ ¡Reserva ahora! ⭐"
                  mangas={presaleMangas}
                  link="/catalogo/preventa"
                />
              </div>
            }
          />

          <Route path="/manga/:id" element={<MangaDetail />} />

          <Route
            path="/admin/mangas"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminMangas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/mangas/create"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateManga />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/mangas/edit/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <EditManga />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/catalogo" element={<Catalog />} />

          <Route path="/catalogo/preventa" element={<Catalog />} />

          <Route path="/catalogo/mas-vendidos" element={<Catalog />} />

          <Route path="/catalogo/nuevos" element={<Catalog />} />

          <Route path="/catalogo/ofertas" element={<Catalog />} />

          <Route path="/catalogo/genero/:genre" element={<Catalog />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#222",
            border: "1px solid #eee",
            borderRadius: "10px",
          },
        }}
      />
    </>
  );
}

export default App;
