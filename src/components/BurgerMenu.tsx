import React, { useState, useEffect } from 'react';
import type { SearchablePost } from '../utils/search';

interface BurgerMenuProps {
  posts: SearchablePost[];
  tags: string[];
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ posts, tags }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('burger-menu');
      const button = document.getElementById('burger-button');
      
      if (isOpen && menu && button && 
          !menu.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button */}
      <button
        id="burger-button"
        className={`burger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Overlay */}
      {/* REMOVED: {isOpen && <div className="burger-overlay" />} */}

      {/* Menu */}
      <div id="burger-menu" className={`burger-menu ${isOpen ? 'open' : ''}`}>
        <div className="burger-header">
          <h2>Explore</h2>
          <button 
            className="close-button"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="burger-content">
          {/* Quick Actions */}
          <div className="menu-section">
            <h3>QUICK ACTIONS</h3>
            <a 
              href="/search"
              className="menu-item"
              onClick={handleLinkClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Search</span>
              <span className="arrow">→</span>
            </a>
            
            <a 
              href="/tags"
              className="menu-item"
              onClick={handleLinkClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <span>Browse Tags</span>
              <span className="arrow">→</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="menu-section">
            <h3>NAVIGATION</h3>
            <div className="nav-links">
              <a href="/essays" onClick={handleLinkClick}>Essays</a>
              <a href="/notes" onClick={handleLinkClick}>Notes</a>
              <a href="/archive" onClick={handleLinkClick}>Archive</a>
              <a href="/about" onClick={handleLinkClick}>About</a>
            </div>
          </div>

          {/* Stats */}
          {/* REMOVED: Stats section */}
        </div>
      </div>

      <style>{`
        .burger-button {
          position: relative;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3px;
          transition: all 0.3s ease;
          z-index: 1001;
          border-radius: 8px;
          padding: 8px;
        }

        .burger-button:hover {
          background: rgba(106, 47, 184, 0.1);
        }

        .burger-line {
          width: 20px;
          height: 2px;
          background: var(--color-text, #333);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: center;
        }

        .burger-button.open .burger-line:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .burger-button.open .burger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }

        .burger-button.open .burger-line:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* REMOVED: .burger-overlay styles */

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .burger-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: min(380px, 100vw);
          height: 100vh;
          background: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 999;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }

        .burger-menu.open {
          right: 0;
        }

        .burger-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: var(--color-card-bg, #FFF1E7);
          flex-shrink: 0;
        }

        .burger-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--color-heading, #333);
          font-weight: 600;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          line-height: 1;
        }

        .close-button:hover {
          background: rgba(106, 47, 184, 0.1);
          color: var(--color-primary, #6a2fb8);
        }

        .burger-content {
          padding: 0;
          flex: 1;
          overflow-y: auto;
        }

        .menu-section {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          padding: 1.5rem 0;
        }

        .menu-section:last-child {
          border-bottom: none;
        }

        .menu-section h3 {
          margin: 0 0 1rem;
          padding: 0 1.5rem;
          font-size: 0.75rem;
          color: var(--color-text-light, #666);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          margin-bottom: 0.5rem;
          border-radius: 0;
        }

        .menu-item:hover {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
        }

        .menu-item svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .menu-item:hover svg {
          opacity: 1;
        }

        .arrow {
          margin-left: auto;
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .menu-item:hover .arrow {
          transform: translateX(4px);
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .nav-links a {
          display: block;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          color: var(--color-text, #333);
          font-weight: 500;
          transition: all 0.3s ease;
          border-radius: 0;
        }

        .nav-links a:hover {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
        }

        /* REMOVED: .stats-grid and .stat-item styles */

        /* Mobile specific adjustments */
        @media (max-width: 480px) {
          .burger-menu {
            width: 100vw;
            right: -100vw;
          }
          
          .burger-header {
            padding: 1rem;
          }
          
          .menu-item {
            padding: 1rem;
          }
          
          .nav-links a {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}; 