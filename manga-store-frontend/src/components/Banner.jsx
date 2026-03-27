import "./Banner.css";
import banner from "../assets/mangas/banner.jpg";

function Banner() {
  return (
    <div className="banner">
      <img src={banner} alt="Banner Manga Store" />
    </div>
  );
}

export default Banner;