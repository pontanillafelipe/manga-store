import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMangas, searchMangas } from "../services/mangaService";
import MangaCard from "../components/MangaCard";
import { GENRES, EDITORIALS } from "../constants/mangaData";
import CatalogSkeleton from "../components/CatalogSkeleton";
import "../styles/Catalog.css";

function Catalog() {
  const { genre } = useParams();

  const normalizedGenre = genre ? genre.toLowerCase() : null;
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const PAGE_SIZE = 20;

  const [mangas, setMangas] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [selectedGenres, setSelectedGenres] = useState(
    normalizedGenre ? [normalizedGenre] : [],
  );
  const [selectedEditorials, setSelectedEditorials] = useState([]);

  const [sortBy, setSortBy] = useState(() => {
    if (location.pathname === "/catalogo/mas-vendidos") {
      return "sold,desc";
    }

    if (location.pathname === "/catalogo/nuevos") {
      return "createdAt,desc";
    }

    return "createdAt,desc";
  });

  const [loading, setLoading] = useState(false);

  const loadMangas = async (page) => {
    setLoading(true);

    try {
      if (searchTerm.trim()) {
        const results = await searchMangas(searchTerm);

        console.log("SEARCH:", results);

        setMangas(results);
        setTotalPages(1);

        return;
      }

      const isPresale = location.pathname === "/catalogo/preventa";

      const isOffers = location.pathname === "/catalogo/ofertas";

      const data = await getMangas(page, PAGE_SIZE, {
        genres: selectedGenres,
        editorials: selectedEditorials,
        presale: isPresale ? true : undefined,
        onSale: isOffers ? true : undefined,
        sort: sortBy,
      });

      console.log("DATA:", data);

      setMangas(data.content);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const genreFromUrl = location.pathname.startsWith("/catalogo/genero/")
    ? decodeURIComponent(location.pathname.split("/").pop())
    : null;

  useEffect(() => {
    loadMangas(currentPage);
  }, [
    currentPage,
    selectedGenres,
    selectedEditorials,
    sortBy,
    searchTerm,
    location.pathname,
  ]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedGenres, selectedEditorials, sortBy]);

  useEffect(() => {
    if (normalizedGenre) {
      setSelectedGenres([normalizedGenre]);
    } else {
      setSelectedGenres([]);
    }

    if (location.pathname === "/catalogo/mas-vendidos") {
      setSortBy("sold,desc");
    } else {
      setSortBy("createdAt,desc");
    }

    setCurrentPage(0);
  }, [normalizedGenre, location.pathname]);

  const changePage = (page) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function toggleFilter(value, selected, setSelected) {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1 className="catalog-title">
          {searchTerm ? `Resultados para "${searchTerm}"` : "Catálogo"}
        </h1>

        <p className="catalog-count">
          {searchTerm
            ? `${mangas.length} mangas encontrados`
            : `Mostrando ${mangas.length} mangas`}
        </p>

        <select
          className="catalog-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt,desc">Más recientes</option>

          <option value="price,asc">Precio: menor a mayor</option>

          <option value="price,desc">Precio: mayor a menor</option>

          <option value="sold,desc">Más vendidos</option>
        </select>
      </div>

      <div className={`catalog-content ${searchTerm ? "search-active" : ""}`}>
        {!searchTerm && (
        <aside className="catalog-sidebar">
          <h3>Géneros</h3>

          {GENRES.map((genre) => (
            <label key={genre.value}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.value)}
                onChange={() =>
                  toggleFilter(genre.value, selectedGenres, setSelectedGenres)
                }
              />

              {genre.label}
            </label>
          ))}

          <h3>Editoriales</h3>

          {EDITORIALS.map((editorial) => (
            <label key={editorial.value}>
              <input
                type="checkbox"
                checked={selectedEditorials.includes(editorial.value)}
                onChange={() =>
                  toggleFilter(
                    editorial.value,
                    selectedEditorials,
                    setSelectedEditorials,
                  )
                }
              />

              {editorial.label}
            </label>
          ))}
        </aside>
        )}

        <main className="catalog-main">
          <div className="catalog-grid">
            {loading ? (
              <CatalogSkeleton />
            ) : (
              mangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)
            )}
          </div>

          {!searchTerm && (
          <div className="catalog-pagination">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              ❮
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i ? "active" : ""}
                onClick={() => changePage(i)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
            >
              ❯
            </button>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Catalog;
