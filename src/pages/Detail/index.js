import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getPhotoById } from '../../services/getPhotoById';
import './styles.css';

export default function Detail({ params }) {
    const { id } = params;
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        getPhotoById(id)
            .then(photoData => {
                setPhoto(photoData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading photo:', error);
                setLoading(false);
            });
    }, [id]);
    
    if (loading) {
        return (
            <div className="Detail-page">
                <Link href="/">
                    <button className="Detail-back-button">
                        ← Zurück
                    </button>
                </Link>
                <div className="Detail-container">
                    <div className="Detail-info">
                        <p>Lädt...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    if (!photo) {
        return (
            <div className="Detail-page">
                <Link href="/">
                    <button className="Detail-back-button">
                        ← Zurück
                    </button>
                </Link>
                <div className="Detail-container">
                    <div className="Detail-info">
                        <p>Bild nicht gefunden</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Obtener la inicial del autor
    const authorInitial = photo.author ? photo.author.charAt(0).toUpperCase() : 'U';
    
    return (
        <div className="Detail-page">
            <Link href="/">
                <button className="Detail-back-button">
                    ← Zurück
                </button>
            </Link>
            
            <div className="Detail-container">
                <div className="Detail-image-wrapper">
                    <img 
                        src={photo.url} 
                        alt={photo.description} 
                    />
                </div>
                
                <div className="Detail-info">
                    <div className="Detail-author">
                        {photo.userProfileImage ? (
                            <img 
                                src={photo.userProfileImage} 
                                alt={photo.author}
                                className="Detail-author-avatar-img"
                            />
                        ) : (
                            <div className="Detail-author-avatar">
                                {authorInitial}
                            </div>
                        )}
                        <div className="Detail-author-info">
                            <div className="Detail-author-name">
                                {photo.author}
                            </div>
                            <div className="Detail-source">
                                <span>Bild von Unsplash</span>
                            </div>
                        </div>
                    </div>
                    
                    {photo.description && (
                        <div className="Detail-description">
                            <p>{photo.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}