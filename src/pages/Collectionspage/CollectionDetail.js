import React, { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { getCollectionPhotos, getCollectionById } from "../../services/getCollections";
import ListOfPics from "../../components/ListOfPics";

export default function CollectionDetail() {
  const [match, params] = useRoute("/collections/:id");
  const id = params?.id;
  
  const [photos, setPhotos] = useState([]);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('🔍 Match:', match);
  console.log('🔍 Params:', params);
  console.log('🔍 ID:', id);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    
     
  Promise.all([
    getCollectionPhotos(id),
    getCollectionById(id)
  ]).then(([photosData, collectionData]) => {
    console.log('=== DATOS RECIBIDOS ===');
    console.log('📸 Número de fotos:', photosData.length);
    console.log('📸 Fotos completas:', photosData);
    console.log('📁 Collection info:', collectionData);
    console.log('📁 Usuario:', collectionData?.user);
    console.log('======================');
    
    setPhotos(photosData);
    setCollection(collectionData);
    setLoading(false);
  }).catch(error => {
    console.error('Error loading collection:', error);
    setLoading(false);
  });
}, [id]);

  if (loading) {
    return (
      <div className="collection-detail">
        <div className="collection-header skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="photos-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="photo-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="collection-detail">
        <div className="collection-error">
          <h2>Collection nicht gefunden</h2>
          <Link href="/">Zurück zur Startseite</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-detail">
      <div className="collection-header">
        <Link href="/" className="back-button">← Zurück</Link>
        <h1>{collection.title}</h1>
        {collection.user && (
          <p className="collection-author">
            von <strong>{collection.user.name || collection.user.username}</strong>
          </p>
        )}
        <p className="collection-count">{photos.length} Fotos</p>
      </div>

      <div className="collection-photos">
        <ListOfPics pics={photos} />
      </div>
    </div>
  );
}