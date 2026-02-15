import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import '../Header/styles.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHome] = useRoute('/');
    const [isCollections] = useRoute('/collections/:id');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="App-header">
            <div className="Header-container">
                {/* Logo y Marca */}
                <Link to="/" className="Header-brand">
                    <img 
                        src="/Glogo.svg" 
                        alt="Genes Logo" 
                        className="Header-logo"
                    />
                    <h1 className="Header-title">Genes</h1>
                </Link>

                {/* Navegación */}
                <nav className={`Header-nav ${isMenuOpen ? 'open' : ''}`}>
                    <Link 
                         to="/" 
                         className={`Header-nav-link ${isHome ? 'active' : ''}`}
                         onClick={(e) => {
                            setIsMenuOpen(false);
                            if (window.location.pathname === '/') {
                             e.preventDefault(); // Evitar navegación
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                         >
                         Home
                    </Link>
                    <Link 
                        to="/#collections" 
                        className={`Header-nav-link ${isCollections ? 'active' : ''}`}
                        onClick={() =>  {
                        setIsMenuOpen(false);
                        setTimeout(() => {
                        const section = document.querySelector('.App-category');
                        section?.scrollIntoView({ behavior: 'smooth' });
                         }, 100);
                        }}
                    >
                         Collections
                    </Link>
                </nav>

                <button 
                    className="Header-menu-button"
                    onClick={toggleMenu}
                    aria-label="Menu"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>
        </header>
    );
}