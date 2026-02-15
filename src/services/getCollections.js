const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
// Helper para caché
function getCached(key, duration = 30 * 60 * 1000) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < duration) {
      return data;
    }
  } catch (e) {}
  
  return null;
}

function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

// ============ COLLECTIONS ============
export function getCollections() {
  const cached = getCached('collections');
  if (cached) {
    console.log('✅ Collections desde caché');
    return Promise.resolve(cached);
  }

  console.log('📡 Collections desde API');
  const apiURL = `https://api.unsplash.com/collections?per_page=20&client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => {
      if (!res.ok) throw new Error('Rate limit - usando caché antiguo');
      return res.json();
    })
    .then(response => {
      const collections = response
        .filter(collection => {
          // Filtrar TODAS las collections que contengan "unsplash" en el username
          const username = collection.user?.username?.toLowerCase() || '';
          return !username.includes('unsplash');
        })
        .map(collection => {
          const { id, title, total_photos, cover_photo, user } = collection;
          return { 
            id, 
            title,
            totalPhotos: total_photos,
            coverPhoto: cover_photo?.urls?.regular || cover_photo?.urls?.small,
            userName: user?.name
          };
        })
        .slice(0, 12);
      
      setCache('collections', collections);
      return collections;
    })
    .catch(error => {
      console.error('Error:', error);
      const oldCache = localStorage.getItem('collections');
      if (oldCache) {
        const { data } = JSON.parse(oldCache);
        return data;
      }
      return [];
    });
}

// ============ COLLECTION PHOTOS ============
export function getCollectionPhotos(id) {
  const cached = getCached(`photos_${id}`);
  if (cached) {
    console.log(`✅ Fotos ${id} desde caché`);
    return Promise.resolve(cached);
  }

  console.log(`📡 Fotos ${id} desde API`);
  const apiURL = `https://api.unsplash.com/collections/${id}/photos?per_page=25&client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => {
      if (!res.ok) throw new Error('Rate limit');
      return res.json();
    })
    .then(response => {
      const photos = response.map(photo => ({
        id: photo.id,
        description: photo.description,
        url: photo.urls.regular
      }));
      
      setCache(`photos_${id}`, photos);
      return photos;
    })
    .catch(error => {
      console.error('Error:', error);
      const oldCache = localStorage.getItem(`photos_${id}`);
      if (oldCache) {
        const { data } = JSON.parse(oldCache);
        return data;
      }
      return [];
    });
}

// ============ COLLECTION BY ID ============
export function getCollectionById(id) {
  const cached = getCached(`collection_${id}`);
  if (cached) {
    console.log(`✅ Collection ${id} desde caché`);
    return Promise.resolve(cached);
  }

  console.log(`📡 Collection ${id} desde API`);
  const apiURL = `https://api.unsplash.com/collections/${id}?client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => {
      if (!res.ok) throw new Error('Rate limit');
      return res.json();
    })
    .then(collection => {
      const { id, title, user } = collection;
      const data = { id, title, user };
      
      setCache(`collection_${id}`, data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      const oldCache = localStorage.getItem(`collection_${id}`);
      if (oldCache) {
        const { data } = JSON.parse(oldCache);
        return data;
      }
      return null;
    });
}