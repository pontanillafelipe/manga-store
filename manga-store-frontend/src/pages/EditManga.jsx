import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMangaById, updateManga } from "../services/mangaService";
import { formatPrice } from "../utils/formatPrice";

function EditManga() {

  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [manga, setManga] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    description: ""
  });

  useEffect(() => {

    const fetchManga = async () => {
    const data = await getMangaById(id);

    setManga({
      ...data,
      description: data.description || ""
    });
  };

    fetchManga();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setManga({
      ...manga,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  console.log("Imagen enviada:", image);

  await updateManga(id, manga, image);

  navigate("/admin/mangas");

};

  return (

    <div className="admin-form-container">

      <h2 className="admin-form-title">Editar Manga</h2>

      <form onSubmit={handleSubmit}>

      <div className="admin-form-group">
        <label>Título</label>
        <input
          name="title"
          value={manga.title}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label>Autor</label>
        <input
          name="author"
          value={manga.author}
          onChange={handleChange}
        />
      </div>

      <div className="admin-form-group">
        <label>Precio</label>
        <input
          type="number"
          name="price"
          value={manga.price}
          onChange={handleChange}
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

      <button className="admin-submit-btn">
        Guardar cambios
      </button>

    </form>

    </div>

  );

}

export default EditManga;