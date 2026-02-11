const apiKey = 'YV1Tqqtl_RjEDI5RU_otft9XbtAEDRzVGh4slG07_Pc'

export function getCollections() {
  const apiURL = `https://api.unsplash.com/collections?per_page=25&client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => res.json())
    .then(response => {
      return response.map(collection => {
        const { id, title } = collection;
        return { id, title };
      });
    });
}

export function getCollectionPhotos(id) {
  const apiURL = `https://api.unsplash.com/collections/${id}/photos?per_page=25&client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => res.json())
    .then(response => {
      return response.map(photo => ({
        id: photo.id,
        description: photo.description,
        url: photo.urls.regular
      }));
    });
}

export function getCollectionById(id) {
  const apiURL = `https://api.unsplash.com/collections/${id}?client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => res.json())
    .then(collection => {
      const { id, title, user } = collection;
      return { id, title, user };
    });
}