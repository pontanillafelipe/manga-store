import { useState } from "react";
import { createManga } from "../services/mangaService";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function CreateManga() {

  const navigate = useNavigate();

  const [manga, setManga] = useState({
  title: "",
  author: "",
  price: "",
  stock: "",
  description: ""
  });

const [image, setImage] = useState(null);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setManga({
      ...manga,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  await createManga(manga, image);

  navigate("/admin/mangas");

};

  return (

    <div className="admin-form-container">

  <h2 className="admin-form-title">
    Agregar Manga
  </h2>

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
      <label>Precio</label>
      <input
        type="number"
        name="price"
        value={manga.price}
        onChange={handleChange}
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

    <button className="admin-submit-btn">
      Guardar Manga
    </button>

  </form>

</div>
  );
}

export default CreateManga;