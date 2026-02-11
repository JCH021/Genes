import React, { useEffect, useState } from "react";
import { useParams } from "wouter";
import { getCollectionPhotos, getCollectionById, getCollection } from "../../services/getCollections";

export default function CollectionDetail() {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [username, setUsername] = useState(""); // ← nuevo estado

  useEffect(() => {
    getCollectionPhotos(id).then(setPhotos);

      getCollectionById(id).then(collection => {
      if (collection.user) {
        setUsername(collection.user.username);
      }
    });
  }, [id]);

  return (
    <div>
      <h2>Collection von {username || "..."}</h2>
      <div className="photos-grid">
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.description || "photo"}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}