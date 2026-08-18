import { Link } from "react-router-dom";
import "./Banner.css";
import banner from "../assets/mangas/banner.jpg";

function Banner() {
  return (
    <Link to="/" className="banner">
      <img src={banner} alt="Banner Manga Store" />
    </Link>
  );
}

export default Banner;