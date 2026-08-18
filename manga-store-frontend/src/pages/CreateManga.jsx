import { useState } from "react";
import { createManga } from "../services/mangaService";
import { useNavigate } from "react-router-dom";
import { GENRES, EDITORIALS } from "../constants/mangaData";
import toast from "react-hot-toast";
import "../styles/AdminMangas.css";

function CreateManga() {
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

  const [image, setImage] = useState(null);

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
      await createManga(manga, image);

      toast.success("Manga agregado correctamente.");

      navigate("/admin/mangas");
    } catch {
      toast.error("No se pudo agregar el manga.");
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Agregar Manga</h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={manga.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Autor</label>
          <input
            type="text"
            name="author"
            value={manga.author}
            onChange={handleChange}
            required
          />
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
            required
          />
        </div>

        <div className="admin-form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={manga.description}
            onChange={handleChange}
          />
        </div>

        <div className="admin-form-group">
          <label>Portada</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className="admin-submit-btn">Guardar Manga</button>
      </form>
    </div>
  );
}

export default CreateManga;
