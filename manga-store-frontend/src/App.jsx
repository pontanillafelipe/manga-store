import { useEffect, useState, useContext } from "react";
import { getMangas, searchMangas } from "./services/mangaService";
import MangaCard from "./components/MangaCard";
import Footer from "./components/Footer";
import { CartContext } from "./context/CartContext";
import Navbar from "./components/Navbar";
import MenuBar from "./components/MenuBar";
import { Routes, Route } from "react-router-dom";
import MangaDetail from "./pages/MangaDetail";
import AdminMangas from "./pages/AdminMangas";
import CreateManga from "./pages/CreateManga";
import EditManga from "./pages/EditManga";
import CartPage from "./pages/CartPage";
import Banner from "./components/Banner";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GenreSection from "./components/GenreSection";
import "./App.css";

function App() {

  const [mangas, setMangas] = useState([]);
  const [search, setSearch] = useState("");

  const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchMangas = async () => {
      const data = await getMangas();
      setMangas(data);
    };

    fetchMangas();
  }, []);

  const handleSearch = async (title) => {

    if (!title.trim()) {
      const data = await getMangas();
      setMangas(data);
      return;
    }

    const results = await searchMangas(title);
    setMangas(results);
  };



  return (
  <>

    <div className="top-line"></div>

    <div className="main-container">

      <Navbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      <Banner />

      <MenuBar />

      <Routes>

        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>

              <GenreSection />

              <div className="manga-grid">
                {mangas.map(manga => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>

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

      </Routes>    

    </div>

          <Footer />
  </>
  );
}

export default App;