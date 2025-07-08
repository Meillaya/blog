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
            <h3>QUICK ACTIONS</h3>
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
              <h3>POPULAR TAGS</h3>
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
            <h3>NAVIGATION</h3>
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

        .burger-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          z-index: 998;
          animation: fadeIn 0.3s ease-out;
        }

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
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          text-align: left;
          margin-bottom: 0.5rem;
          border-radius: 0;
        }

        .menu-item:hover {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
        }

        .menu-item.active {
          background: var(--color-card-bg, #FFF1E7);
          color: var(--color-primary, #6a2fb8);
        }

        .menu-item svg {
          flex-shrink: 0;
          opacity: 0.7;
        }

        .menu-item:hover svg,
        .menu-item.active svg {
          opacity: 1;
        }

        .arrow {
          margin-left: auto;
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .search-section {
          padding: 1rem 1.5rem;
          background: #f8f9fa;
        }

        .tags-section {
          padding: 1rem 1.5rem;
          background: #f8f9fa;
        }

        .tags-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag-link {
          background: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          color: var(--color-text, #333);
          font-size: 0.85rem;
          transition: all 0.3s ease;
          text-align: center;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .tag-link:hover {
          background: var(--color-primary, #6a2fb8);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(106, 47, 184, 0.2);
        }

        .view-all-tags {
          display: inline-block;
          color: var(--color-primary, #6a2fb8);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .view-all-tags:hover {
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

        /* Search component overrides */
        :global(.burger-search .search-results) {
          position: static;
          max-height: 250px;
          margin-top: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        :global(.burger-search .search-input-wrapper) {
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          background: white;
        }

        :global(.burger-search .search-input) {
          font-size: 0.9rem;
          padding: 0.6rem 0.75rem;
        }

        :global(.burger-search .search-button) {
          padding: 0.6rem;
        }

        /* Mobile specific adjustments */
        @media (max-width: 480px) {
          .burger-menu {
            width: 100vw;
            right: -100vw;
          }
          
          .burger-header {
            padding: 1rem;
          }
          
          .tags-grid {
            grid-template-columns: 1fr;
          }
          
          .menu-item {
            padding: 1rem;
          }
          
          .nav-links a {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}; 