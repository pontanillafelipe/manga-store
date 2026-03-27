import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/mangas/logo.png";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ search, setSearch, onSearch }) {

  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <nav className="navbar">

      {/* SEARCH */}
      <div className="nav-left">
        <div className="search-box">
          <FaSearch className="search-icon"/>

          <input
            type="text"
            placeholder="Buscar manga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* LOGO */}
      <Link to="/">
        <img src={logo} alt="Manga X Store" className="logo"/>
      </Link>

      {/* CART */}
      <div className="nav-right">
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart /> {totalItems}
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;