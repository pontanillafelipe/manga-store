import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMangaById } from "../services/mangaService";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import MangaBadge from "../components/MangaBadge";
import "../styles/MangaDetail.css";
import "../components/MangaBadge.css";

function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const discount =
    manga.onSale && manga.originalPrice
      ? Math.round(
          ((manga.originalPrice - manga.price) / manga.originalPrice) * 100,
        )
      : 0;

  const handleAddToCart = () => {
    addToCart({ ...manga, quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...manga, quantity });
    navigate("/cart");
  };

  return (
    <div className="manga-detail">
      {/* IMAGEN */}
      <div className="detail-image-container">
        <img
          src={`http://localhost:8080${manga.imageUrl}`}
          alt={manga.title}
          className={`detail-image ${
            manga.stock === 0 ? "sold-out-image" : ""
          }`}
        />

        {manga.stock > 0 ? (
          <MangaBadge manga={manga} />
        ) : (
          <div className="sold-out-overlay">AGOTADO</div>
        )}
      </div>

      {/* INFO */}
      <div className="detail-info">
        <h1 className="detail-title">{manga.title}</h1>

        {/* PRECIO */}
        {manga.onSale && manga.originalPrice ? (
          <div className="detail-price-sale">
            <span className="detail-original-price">
              {formatPrice(manga.originalPrice)}
            </span>

            <div className="detail-sale-row">
              <span className="detail-sale-price">
                {formatPrice(manga.price)}
              </span>

              <span className="detail-discount">
                -{discount}%
              </span>
            </div>
          </div>
        ) : (
          <div className="detail-price">
            {formatPrice(manga.price)}
          </div>
        )}

        <div className="detail-stock">
          Stock disponible: {manga.stock}
        </div>

        {/* BOTONES */}
        <div className="detail-buttons">
          <div className="quantity-box">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={manga.stock === 0}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity((q) => Math.min(manga.stock, q + 1))
              }
              disabled={manga.stock === 0 || quantity >= manga.stock}
            >
              +
            </button>
          </div>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={manga.stock === 0}
          >
            Agregar al carrito
          </button>

          <button
            className="buy-now-btn"
            onClick={handleBuyNow}
            disabled={manga.stock === 0}
          >
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