import "./GenreSection.css";
import { useNavigate } from "react-router-dom";
import shonen from "../assets/mangas/genres/shounen.jpg";
import seinen from "../assets/mangas/genres/seinen.jpg";
import shoujo from "../assets/mangas/genres/shoujo.jpg";

function GenreSection() {
  const navigate = useNavigate();

  const genres = [
    { name: "Shounen", img: shonen },
    { name: "Seinen", img: seinen },
    { name: "Shoujo", img: shoujo }
  ];

  return (
    <div className="genre-grid">
      {genres.map((g) => (
        <div
          key={g.name}
          className="genre-card"
          style={{ backgroundImage: `url(${g.img})` }}
          onClick={() => navigate(`/mangas?genre=${g.name}`)}
        >
          <span>{g.name}</span>
        </div>
      ))}
    </div>
  );
}

export default GenreSection;