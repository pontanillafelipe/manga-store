function MangaBadge({ manga }) {
  const today = new Date();

  const createdAt = manga.createdAt
    ? new Date(manga.createdAt)
    : null;

  if (manga.presale) {
    return <span className="manga-badge manga-badge-presale">PREVENTA</span>;
  }

  if (manga.sold >= 100) {
    return (
      <span className="manga-badge manga-badge-bestseller">
        MÁS VENDIDO
      </span>
    );
  }

  if (
    createdAt &&
    (today - createdAt) / (1000 * 60 * 60 * 24) <= 30
  ) {
    return <span className="manga-badge manga-badge-new">NUEVO</span>;
  }

  if (manga.stock <= 5) {
    return (
      <span className="manga-badge manga-badge-stock">
        ÚLTIMAS
        <br />
        UNIDADES
      </span>
    );
  }

  return null;
}

export default MangaBadge;