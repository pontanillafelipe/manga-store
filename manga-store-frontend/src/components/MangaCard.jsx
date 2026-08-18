import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { motion } from "framer-motion";
import MangaBadge from "./MangaBadge";
import "./MangaCard.css";
import "./MangaBadge.css";

function MangaCard({ manga }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  function formatTitle(title) {
    return title.replace(/Vol\.\s/g, "Vol.\u00A0");
  }

  return (
    <motion.div
      className="manga-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
    >
      <div className="manga-image-container">
        <img
          className={`manga-image ${manga.stock === 0 ? "sold-out-image" : ""}`}
          src={
            manga.imageUrl
              ? `http://localhost:8080${manga.imageUrl}`
              : "/default-manga.jpg"
          }
          alt={formatTitle(manga.title)}
          onClick={() => navigate(`/manga/${manga.id}`)}
          style={{ cursor: "pointer" }}
        />

        {manga.stock > 0 ? (
          <MangaBadge manga={manga} />
        ) : (
          <div className="sold-out-overlay">AGOTADO</div>
        )}
      </div>

      <div className="manga-editorial">{manga.editorial}</div>

      <div className="manga-info">
        <div
          className="manga-title"
          onClick={() => navigate(`/manga/${manga.id}`)}
          style={{ cursor: "pointer" }}
        >
          {formatTitle(manga.title)}
        </div>

        {manga.onSale && manga.originalPrice ? (
          <div className="manga-price-sale">
            <span className="manga-original-price">
              {formatPrice(manga.originalPrice)}
            </span>

            <div className="manga-sale-row">
              <span className="manga-sale-price">
                {formatPrice(manga.price)}
              </span>

              <span className="manga-discount">
                -
                {Math.round(
                  ((manga.originalPrice - manga.price) / manga.originalPrice) *
                    100,
                )}
                %
              </span>
            </div>
          </div>
        ) : (
          <p className="manga-price">{formatPrice(manga.price)}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="add-cart-btn"
          onClick={() => addToCart(manga)}
          disabled={manga.stock === 0}
        >
          AGREGAR AL CARRO
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MangaCard;
