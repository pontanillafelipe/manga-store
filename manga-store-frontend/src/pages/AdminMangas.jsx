import { useEffect, useState } from "react";
import { getMangas, deleteManga } from "../services/mangaService";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import "../styles/Admin.css";

function AdminMangas() {

  const [mangas, setMangas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async () => {
    const data = await getMangas();
    setMangas(data);
  };

  const handleDelete = async (id) => {

  if (!window.confirm("¿Eliminar este manga?")) return;

  await deleteManga(id);

  setMangas(mangas.filter(m => m.id !== id));

};

  return (

    <div className="admin-container">

  <h1 className="admin-title">
    Gestión de Mangas
  </h1>

  <div className="admin-actions">
    <button className="admin-btn"onClick={() => navigate("/admin/mangas/create")}>Agregar Manga</button>
  </div>

  <table className="admin-table">

    <thead>
      <tr>
        <th>ID</th>
        <th>Portada</th>
        <th>Título</th>
        <th>Autor</th>
        <th>Precio</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>

      {mangas.map((manga) => (
        <tr key={manga.id}>
         <td>{manga.id}</td>
          <td>
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
          <td>{manga.title}</td>
          <td>{manga.author}</td>
          <td>{formatPrice(manga.price)}</td>
          <td>{manga.stock}</td>
          <td>
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
          </td>
        </tr>
      ))}
    </tbody>

  </table>

</div>
  );
}

export default AdminMangas;