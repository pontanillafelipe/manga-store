const API_URL = "http://localhost:8080/api";

export const getMangasPage = async (page = 0, size = 20) => {
  const response = await fetch(`${API_URL}/mangas?page=${page}&size=${size}`);

  return response.json();
};

export const getMangas = async (page = 0, size = 20, filters = {}) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("size", size);

  if (filters.genres?.length) {
    filters.genres.forEach((genre) => {
      params.append("genres", genre);
    });
  }

  if (filters.editorials?.length) {
    filters.editorials.forEach((editorial) => {
      params.append("editorials", editorial);
    });
  }

  if (filters.presale !== undefined) {
    params.append("presale", filters.presale);
  }

  if (filters.onSale !== undefined) {
    params.append("onSale", filters.onSale);
  }

  if (filters.sort) {
    params.append("sort", filters.sort);
  }

  const response = await fetch(`${API_URL}/mangas?${params.toString()}`);

  return response.json();
};

export const getPresaleMangas = async () => {
  const response = await fetch(`${API_URL}/mangas/presale`);
  return response.json();
};

export const getNewMangas = async () => {
  const response = await fetch(`${API_URL}/mangas/new`);
  return response.json();
};

export const getBestSellerMangas = async () => {
  const response = await fetch(`${API_URL}/mangas/bestsellers`);
  return response.json();
};

export const searchMangas = async (title) => {
  const response = await fetch(
    `${API_URL}/mangas/search?title=${encodeURIComponent(title)}`,
  );

  const data = await response.json();

  return Array.isArray(data) ? data : data.content;
};

export const searchAdminMangas = async (title) => {
  const response = await fetch(
    `${API_URL}/mangas/search?title=${encodeURIComponent(title)}`,
  );

  return response.json();
};

export const getMangaById = async (id) => {
  const response = await fetch(`${API_URL}/mangas/${id}`);
  return response.json();
};

export const deleteManga = async (id) => {
  await fetch(`${API_URL}/mangas/${id}`, {
    method: "DELETE",
  });
};

export const createManga = async (manga, image) => {
  const formData = new FormData();

  formData.append("title", manga.title);
  formData.append("author", manga.author);
  formData.append("price", manga.price);
  formData.append("onSale", manga.onSale);
  formData.append("originalPrice", manga.onSale ? manga.originalPrice : "");
  formData.append("stock", manga.stock);
  formData.append("description", manga.description);
  formData.append("image", image);
  formData.append("genre", manga.genre);
  formData.append("editorial", manga.editorial);
  formData.append("presale", manga.presale);
  formData.append("releaseDate", manga.releaseDate);

  const response = await fetch(`${API_URL}/mangas`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const updateManga = async (id, manga, image) => {
  const formData = new FormData();

  formData.append("title", manga.title);
  formData.append("author", manga.author);
  formData.append("price", manga.price);
  formData.append("stock", manga.stock);
  formData.append("description", manga.description);
  formData.append("genre", manga.genre);
  formData.append("editorial", manga.editorial);

  // Preventa
  formData.append("presale", manga.presale);

  // Oferta
  formData.append("onSale", manga.onSale);

  if (manga.onSale) {
    formData.append("originalPrice", manga.originalPrice);
  }

  // Fecha
  if (manga.releaseDate) {
    formData.append("releaseDate", manga.releaseDate);
  }

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_URL}/mangas/${id}`, {
    method: "PUT",
    body: formData,
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Error al actualizar manga");
  }

  return text ? JSON.parse(text) : null;
};
