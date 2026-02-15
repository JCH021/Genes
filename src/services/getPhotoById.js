const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;

export function getPhotoById(id) {
  const apiURL = `https://api.unsplash.com/photos/${id}?client_id=${apiKey}`;

  return fetch(apiURL)
    .then(res => res.json())
    .then(photo => {
      const { 
        id, 
        description, 
        alt_description,
        urls, 
        user,
        created_at,
        likes,
        downloads
      } = photo;
      
      return {
        id,
        description: description || alt_description || 'Unsplash Bild',
        url: urls.regular,
        urlFull: urls.full,
        urlThumb: urls.thumb,
        author: user.name,
        username: user.username,
        userProfileImage: user.profile_image.medium,
        userLink: user.links.html,
        createdAt: created_at,
        likes: likes,
        downloads: downloads
      };
    });
}