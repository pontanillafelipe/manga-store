import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import "./MangaCard.css";

function MangaCard({ manga }) {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="manga-card">

      <div className="manga-image-container">

        <img
          className="manga-image"
          src={
            manga.imageUrl
              ? `http://localhost:8080${manga.imageUrl}`
              : "/default-manga.jpg"
          }
          alt={manga.title}
          onClick={() => navigate(`/manga/${manga.id}`)}
          style={{ cursor: "pointer" }}
        />

        {manga.stock > 0 && (
          <div className="stock-badge available">
            Disponible
          </div>
        )}

        {manga.stock === 0 && (
          <div className="stock-badge sold-out">
            Agotado
          </div>
        )}

      </div>

      <div className="manga-info">

        <div
          className="manga-title"
          onClick={() => navigate(`/manga/${manga.id}`)}
          style={{ cursor: "pointer" }}
        >
          {manga.title}
        </div>

        <p>{formatPrice(manga.price)}</p>

        <button
          className="add-cart-btn"
          onClick={() => addToCart(manga)}
          disabled={manga.stock === 0}
        >
          Agregar al carrito
        </button>

      </div>

    </div>
  );
}

export default MangaCard;