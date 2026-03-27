import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMangaById } from "../services/mangaService";
import { mangaImages } from "../data/mangaImages";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import "./MangaDetail.css";

function MangaDetail() {

  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    const fetchManga = async () => {
      const data = await getMangaById(id);
      setManga(data);
    };

    fetchManga();

  }, [id]);

  if (!manga) return <div>Cargando...</div>;

  const image = mangaImages[manga.id];

  return (

    <div className="manga-detail">

      {/* IMAGEN */}
      <div className="detail-image-container">

        <span className="stock-badge available">
          Disponible
        </span>

        <img
          src={`http://localhost:8080${manga.imageUrl}`}
          alt={manga.title}
          className="detail-image"
        />

      </div>

      {/* INFO */}
      <div className="detail-info">

        <h1 className="detail-title">
          {manga.title}
        </h1>

        <h3>{formatPrice(manga.price)}</h3>

        <div className="detail-stock">
          Stock disponible: {manga.stock}
        </div>

        {/* BOTONES */}
        <div className="detail-buttons">

        <div className="quantity-box">

            <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
            -
            </button>

            <span>{quantity}</span>

            <button
            onClick={() => setQuantity(q => q + 1)}
            >
            +
            </button>

        </div>

        <button
            className="add-cart-btn"
            onClick={() => addToCart({ ...manga, quantity })}
        >
            Agregar al carrito
        </button>

        <button className="buy-now-btn">
            Comprar ahora
        </button>

        </div>

        {/* DESCRIPCIÓN */}
        <div className="detail-description">

          <h3>Descripción</h3>

          <p>
            {manga.description || "Descripción del manga próximamente."}
          </p>

        </div>

      </div>

    </div>

  );
}

export default MangaDetail;