import React, { useState, useEffect } from 'react';
import { SearchComponent } from './SearchComponent';
import type { SearchablePost } from '../utils/search';

interface BurgerMenuProps {
  posts: SearchablePost[];
  tags: string[];
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ posts, tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTags, setShowTags] = useState(false);

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
    setShowSearch(false);
    setShowTags(false);
  };

  const handleMenuItemClick = (item: string) => {
    if (item === 'search') {
      setShowSearch(!showSearch);
      setShowTags(false);
    } else if (item === 'tags') {
      setShowTags(!showTags);
      setShowSearch(false);
    }
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
      {isOpen && <div className="burger-overlay" />}

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
            <h3>Quick Actions</h3>
            <button 
              className={`menu-item ${showSearch ? 'active' : ''}`}
              onClick={() => handleMenuItemClick('search')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span>Search</span>
              <span className="arrow">{showSearch ? '▲' : '▼'}</span>
            </button>
            
            <button 
              className={`menu-item ${showTags ? 'active' : ''}`}
              onClick={() => handleMenuItemClick('tags')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <span>Browse Tags</span>
              <span className="arrow">{showTags ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* Search Section */}
          {showSearch && (
            <div className="menu-section search-section">
              <SearchComponent 
                posts={posts}
                placeholder="Search posts..."
                className="burger-search"
              />
            </div>
          )}

          {/* Tags Section */}
          {showTags && (
            <div className="menu-section tags-section">
              <h3>Popular Tags</h3>
              <div className="tags-grid">
                {tags.slice(0, 12).map(tag => (
                  <a 
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="tag-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {tag}
                  </a>
                ))}
              </div>
              <a 
                href="/tags" 
                className="view-all-tags"
                onClick={() => setIsOpen(false)}
              >
                View all tags →
              </a>
            </div>
          )}

          {/* Navigation Links */}
          <div className="menu-section">
            <h3>Navigation</h3>
            <div className="nav-links">
              <a href="/essays" onClick={() => setIsOpen(false)}>Essays</a>
              <a href="/notes" onClick={() => setIsOpen(false)}>Notes</a>
              <a href="/archive" onClick={() => setIsOpen(false)}>Archive</a>
              <a href="/about" onClick={() => setIsOpen(false)}>About</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .burger-button {
          position: relative;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          z-index: 1001;
        }

        .burger-button:hover {
          transform: scale(1.1);
        }

        .burger-line {
          width: 24px;
          height: 3px;
          background: var(--color-text, #333);
          border-radius: 3px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: center;
        }

        .burger-button.open .burger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .burger-button.open .burger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(-20px);
        }

        .burger-button.open .burger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .burger-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 999;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .burger-menu {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
          transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1000;
          overflow-y: auto;
        }

        .burger-menu.open {
          right: 0;
        }

        .burger-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e1e5e9;
          background: var(--color-card-bg, #FFF1E7);
        }

        .burger-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--color-heading, #333);
          font-weight: 700;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(1.1);
        }

        .burger-content {
          padding: 1rem 0;
        }

        .menu-section {
          margin-bottom: 2rem;
        }

        .menu-section h3 {
          margin: 0 0 1rem;
          padding: 0 2rem;
          font-size: 1.1rem;
          color: var(--color-text-light, #666);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          text-align: left;
        }

        .menu-item:hover {
          background: var(--color-card-bg, #FFF1E7);
          padding-left: 2.5rem;
        }

        .menu-item.active {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
        }

        .menu-item svg {
          flex-shrink: 0;
        }

        .arrow {
          margin-left: auto;
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .search-section {
          padding: 0 2rem;
        }

        .tags-section {
          padding: 0 2rem;
        }

        .tags-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag-link {
          background: var(--color-card-bg, #FFF1E7);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          text-decoration: none;
          color: var(--color-text, #333);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-align: center;
        }

        .tag-link:hover {
          background: var(--color-primary, #6a2fb8);
          color: white;
          transform: translateY(-2px);
        }

        .view-all-tags {
          display: inline-block;
          color: var(--color-primary, #6a2fb8);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .view-all-tags:hover {
          transform: translateX(5px);
        }

        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-links a {
          display: block;
          padding: 0.75rem 2rem;
          text-decoration: none;
          color: var(--color-text, #333);
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
          padding-left: 2.5rem;
        }

        /* Search component overrides */
        :global(.burger-search .search-results) {
          position: static;
          max-height: 300px;
          margin-top: 1rem;
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        :global(.burger-search .search-input-wrapper) {
          border: 1px solid #e1e5e9;
          border-radius: 8px;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .burger-menu {
            width: 100vw;
            right: -100vw;
          }
          
          .burger-menu.open {
            right: 0;
          }

          .tags-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}; 