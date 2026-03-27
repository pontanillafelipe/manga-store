const API_URL = "http://localhost:8080/api";

export const getMangas = async () => {

  const response = await fetch(`${API_URL}/mangas`);

  const data = await response.json();

  return data.content;

};

export const searchMangas = async (title) => {

  const response = await fetch(
    `${API_URL}/mangas/search?title=${encodeURIComponent(title)}`
  );

  const data = await response.json();

  return Array.isArray(data) ? data : data.content;

};

export const getMangaById = async (id) => {
  const response = await fetch(`${API_URL}/mangas/${id}`);
  return response.json();
};

export const deleteManga = async (id) => {

  await fetch(`${API_URL}/mangas/${id}`, {
    method: "DELETE"
  });

};

export const createManga = async (manga, image) => {

  const formData = new FormData();

  formData.append("title", manga.title);
  formData.append("author", manga.author);
  formData.append("price", manga.price);
  formData.append("stock", manga.stock);
  formData.append("description", manga.description);
  formData.append("image", image);

  const response = await fetch(`${API_URL}/mangas`, {
    method: "POST",
    body: formData
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

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`${API_URL}/mangas/${id}`, {
    method: "PUT",
    body: formData
  });

  return response.json();
};