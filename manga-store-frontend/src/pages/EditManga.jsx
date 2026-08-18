import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMangaById, updateManga } from "../services/mangaService";
import { GENRES, EDITORIALS } from "../constants/mangaData";
import toast from "react-hot-toast";
import "../styles/AdminMangas.css";

function EditManga() {
  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [manga, setManga] = useState({
    title: "",
    author: "",
    genre: "",
    editorial: "",
    releaseDate: "",
    presale: false,
    onSale: false,
    originalPrice: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const fetchManga = async () => {
      const data = await getMangaById(id);

      setManga({
        ...data,
        description: data.description ?? "",
        presale: data.presale ?? false,
        onSale: data.onSale ?? false,
        originalPrice: data.originalPrice ?? "",
        releaseDate: data.releaseDate ?? "",
      });
    };

    fetchManga();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setManga({
      ...manga,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (manga.onSale && Number(manga.price) >= Number(manga.originalPrice)) {
      toast.error("El precio de oferta debe ser menor al precio original.");
      return;
    }

    try {
      await updateManga(id, manga, image);

      toast.success("Manga actualizado correctamente.");

      navigate("/admin/mangas");
    } catch {
      toast.error("No se pudo actualizar el manga.");
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Editar Manga</h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Título</label>
          <input name="title" value={manga.title} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label>Autor</label>
          <input name="author" value={manga.author} onChange={handleChange} />
        </div>

        <div className="admin-form-group">
          <label>Género</label>
          <select name="genre" value={manga.genre} onChange={handleChange}>
            <option value="">Seleccione un género</option>

            {GENRES.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Editorial</label>
          <select
            name="editorial"
            value={manga.editorial}
            onChange={handleChange}
          >
            <option value="">Seleccione una editorial</option>
            {EDITORIALS.map((editorial) => (
              <option key={editorial.value} value={editorial.value}>
                {editorial.label}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Fecha de lanzamiento</label>
          <input
            type="date"
            name="releaseDate"
            value={manga.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="presale"
              checked={manga.presale}
              onChange={(e) =>
                setManga({
                  ...manga,
                  presale: e.target.checked,
                })
              }
            />
            Preventa
          </label>
        </div>

        <div className="admin-form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="onSale"
              checked={manga.onSale}
              onChange={(e) =>
                setManga({
                  ...manga,
                  onSale: e.target.checked,
                })
              }
            />
            En oferta
          </label>
        </div>

        {manga.onSale && (
          <div className="admin-form-group">
            <label>Precio original</label>

            <input
              type="number"
              name="originalPrice"
              value={manga.originalPrice}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        )}

        <div className="admin-form-group">
          <label>{manga.onSale ? "Precio de oferta" : "Precio"}</label>
          <input
            type="number"
            name="price"
            value={manga.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={manga.stock}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={manga.description || ""}
            onChange={handleChange}
          />
        </div>

        {manga.imageUrl && (
          <div className="admin-form-image-preview">
            <p>Portada actual</p>
            <img
              src={`http://localhost:8080${manga.imageUrl}`}
              alt="Portada actual"
            />
          </div>
        )}

        <div className="admin-form-group">
          <label>Cambiar portada</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className="admin-submit-btn">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditManga;
