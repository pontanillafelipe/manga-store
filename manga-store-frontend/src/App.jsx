import { useEffect, useState, useContext } from "react";
import { getMangas, searchMangas } from "./services/mangaService";
import MangaCard from "./components/MangaCard";
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

              <div className="manga-grid">
                {mangas.map(manga => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>

            </div>
          }
        />

        <Route path="/manga/:id" element={<MangaDetail />} />

        {/* ADMIN */}
        <Route path="/admin/mangas" element={<AdminMangas />} />
        <Route path="/admin/mangas/create" element={<CreateManga />} />
        <Route path="/admin/mangas/edit/:id" element={<EditManga />} />

        <Route path="/cart" element={<CartPage />} />

      </Routes>

    </div>
  );
}

export default App;