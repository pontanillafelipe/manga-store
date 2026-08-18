import "./MenuBar.css";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const navigate = useNavigate();

  return (
    <div className="menu-bar">
      <button className="menu-item" onClick={() => navigate("/catalogo")}>
        CATÁLOGO
      </button>

      <button
        className="menu-item"
        onClick={() => navigate("/catalogo/preventa")}
      >
        PREVENTA
      </button>

      <button
        className="menu-item"
        onClick={() => navigate("/catalogo/mas-vendidos")}
      >
        MÁS VENDIDOS
      </button>

      <button
        className="menu-item"
        onClick={() => navigate("/catalogo/nuevos")}
      >
        NUEVOS
      </button>

      <button
        className="menu-item"
        onClick={() => navigate("/catalogo/ofertas")}
      >
        OFERTAS
      </button>
    </div>
  );
}

export default MenuBar;
