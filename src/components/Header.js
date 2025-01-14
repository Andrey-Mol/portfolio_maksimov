import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Закрытие меню при клике на странице
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.header') && isMenuOpen) {
                closeMenu();
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    return (
        <header className={`header ${isMenuOpen ? 'expanded' : ''}`}>
            <div className="header-logo" onClick={toggleMenu}>
                <img src={require("../images/points.png")} alt="Logo" />
            </div>

            {/* Меню для ПК */}
            {!isMobile && (
                <nav className={`desktop-menu ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/projects" onClick={closeMenu}>Projects</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/admin" onClick={closeMenu}>Admin</Link>
                </nav>
            )}

            {/* Шторка для мобильных устройств */}
            {isMobile && (
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <button className="close-button" onClick={closeMenu}>✕</button>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/projects" onClick={closeMenu}>Projects</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/admin" onClick={closeMenu}>Admin</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
