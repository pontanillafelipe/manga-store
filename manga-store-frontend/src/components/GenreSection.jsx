import "./GenreSection.css";
import { useNavigate } from "react-router-dom";

import shonen from "../assets/mangas/genres/shounen.jpg";
import seinen from "../assets/mangas/genres/seinen.jpg";
import shoujo from "../assets/mangas/genres/shoujo.jpg";

function GenreSection() {
  const navigate = useNavigate();

  const genres = [
    {  name: "Shounen", value: "shounen", img: shonen },
    {  name: "Seinen", value: "seinen", img: seinen },
    {  name: "Shoujo", value: "shoujo", img: shoujo },
  ];

  return (
    <div className="genre-grid">
      {genres.map((g) => (
        <div
          key={g.name}
          className="genre-card"
          style={{ backgroundImage: `url(${g.img})` }}
          onClick={() => navigate(`/catalogo/genero/${g.name}`)}
        >
        </div>
      ))}
    </div>
  );
}

export default GenreSection;