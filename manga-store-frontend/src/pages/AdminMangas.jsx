import { useEffect, useState } from "react";
import {
  getMangasPage,
  searchAdminMangas,
  deleteManga,
} from "../services/mangaService";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { GENRES, EDITORIALS } from "../constants/mangaData";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "../styles/AdminMangas.css";

function AdminMangas() {
  const [mangas, setMangas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const PAGE_SIZE = 20;

  const getGenreLabel = (value) =>
    GENRES.find((g) => g.value === value)?.label || value;

  const getEditorialLabel = (value) =>
    EDITORIALS.find((e) => e.value === value)?.label || value;

  useEffect(() => {
    const loadMangas = async () => {
      try {
        if (search.trim()) {
          const results = await searchAdminMangas(search.trim());

          setMangas(Array.isArray(results) ? results : results.content || []);
          setTotalPages(0);

          return;
        }

        const data = await getMangasPage(currentPage, PAGE_SIZE);

        setMangas(data.content || []);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error cargando mangas:", error);
        toast.error("No se pudieron cargar los mangas.");
      }
    };

    loadMangas();
  }, [currentPage, search]);

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim()) {
      setCurrentPage(0);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar manga?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7a18",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteManga(id);

      toast.success("Manga eliminado correctamente.");

      if (mangas.length === 1 && currentPage > 0 && !search.trim()) {
        setCurrentPage((page) => page - 1);
      } else {
        const data = await getMangasPage(currentPage, PAGE_SIZE);

        setMangas(data.content || []);
        setTotalPages(data.totalPages);
      }
    } catch {
      toast.error("No se pudo eliminar el manga.");
    }
  };

  const changePage = (page) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Gestión de Mangas</h1>

      <div className="admin-toolbar">
        <div className="admin-search">
          <input
            type="text"
            placeholder="Buscar manga..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/mangas/create")}
        >
          Agregar Manga
        </button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Portada</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Género</th>
              <th>Editorial</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {mangas.map((manga) => (
              <tr key={manga.id}>
                <td data-label="ID">{manga.id}</td>

                <td data-label="Portada">
                  <img
                    src={
                      manga.imageUrl
                        ? `http://localhost:8080${manga.imageUrl}`
                        : "/default-manga.jpg"
                    }
                    alt={manga.title}
                    className="admin-manga-thumb"
                  />
                </td>

                <td data-label="Título">{manga.title}</td>

                <td data-label="Autor">{manga.author}</td>

                <td data-label="Género">{getGenreLabel(manga.genre)}</td>

                <td data-label="Editorial">
                  {getEditorialLabel(manga.editorial)}
                </td>

                <td data-label="Precio">{formatPrice(manga.price)}</td>

                <td data-label="Stock">{manga.stock}</td>

                <td data-label="Acciones">
                  <div className="admin-actions">
                    <button
                      className="admin-action-btn edit-btn"
                      onClick={() => navigate(`/admin/mangas/edit/${manga.id}`)}
                    >
                      Editar
                    </button>

                    <button
                      className="admin-action-btn delete-btn"
                      onClick={() => handleDelete(manga.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!search.trim() && (
        <div className="admin-pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Anterior
          </button>

          <span>
            Página {currentPage + 1} de {totalPages}
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminMangas;
