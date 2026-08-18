import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/mangas/logo.png";
import {
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";

function Navbar({ search, setSearch, onSearch }) {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* IZQUIERDA */}
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Manga X Store" className="logo" />
        </Link>
      </div>

      {/* CENTRO */}
      <div className="nav-center">
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Buscar manga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* DERECHA */}
      <div className="nav-right">
        <Link to="/cart" className="icon-btn cart-icon">
          <FaShoppingCart />

          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        {user ? (
          <div className="user-section">
            {/* BOTÓN ADMIN */}
            {user.role === "admin" && (
              <Link
                to="/admin/mangas"
                className="admin-icon-btn"
                title="Panel Admin"
              >
                <FaShieldAlt />
              </Link>
            )}

            <FaUserCircle className="profile-icon" />

            <span className="user-name">{user.name}</span>

            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            <FaUserCircle />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
