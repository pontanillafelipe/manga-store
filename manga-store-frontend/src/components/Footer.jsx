import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerBg from "../assets/mangas/footer.jpg";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer-overlay">
        <div className="footer-content">
          {/* LOGO / INFO */}
          <div className="footer-section">
            <h2>Manga X Store</h2>

            <p>
              Tu tienda online de mangas, preventas y colecciones favoritas.
            </p>
          </div>

          {/* LINKS */}
          <div className="footer-section">
            <h3>Navegación</h3>

            <ul>
              <li>
                <Link to="/catalogo">Catálogo</Link>
              </li>
              <li>
                <Link to="/catalogo/preventa">Preventa</Link>
              </li>
              <li>
                <Link to="/catalogo/mas-vendidos">Más vendidos</Link>
              </li>
              <li>
                <Link to="/catalogo/ofertas">Ofertas</Link>
              </li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="footer-section">
            <h3>Contacto</h3>

            <p>
              <FaEnvelope /> contacto@mangaxstore.cl
            </p>

            <p>
              <FaPhone /> +56 9 9999 9999
            </p>

            <div className="footer-socials">
              <FaFacebook />

              <FaInstagram />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Manga X Store - Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}

export default Footer;
