import React from "react";
import { Link } from "wouter";

export default function Category({ name, options = [], loading = false, error = null }) {
  if (loading) {
    return (
      <div className="Collection">
        <h3 className="Collection-title">{name}</h3>
        <div className="Category-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="Category-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Collection">
        <h3 className="Collection-title">{name}</h3>
        <div className="Collection-error">
          <p>⚠️ {error}</p>
          <p>Die Seite wird in einer Stunde wieder verfügbar sein.</p>
        </div>
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="Collection">
        <h3 className="Collection-title">{name}</h3>
        <p className="Collection-empty">Keine Collections gefunden</p>
      </div>
    );
  }

  return (
    <div className="Collection">
      <h3 className="Collection-title">{name}</h3>
      <div className="Category-grid">
        {options.map((collection) => (
          <Link 
            key={collection.id} 
            to={`/collections/${collection.id}`}
            className="Category-card"
          >
            <div className="Category-card-image">
              <img 
                src={collection.coverPhoto} 
                alt={collection.title}
                loading="lazy"
              />
              <div className="Category-card-overlay">
                <span className="Category-card-count">
                  {collection.totalPhotos} Fotos
                </span>
              </div>
            </div>
            <div className="Category-card-content">
              <h4 className="Category-card-title">{collection.title}</h4>
              {collection.userName && (
                <p className="Category-card-author">von {collection.userName}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}