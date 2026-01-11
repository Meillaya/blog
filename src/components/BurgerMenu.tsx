import React, { useState, useEffect } from 'react';

interface BurgerMenuProps {
  posts: any[];
  tags: string[];
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ posts: _posts, tags: _tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('burger-menu');
      const button = document.getElementById('burger-button');
      
      if (isOpen && menu && button && 
          !menu.contains(event.target as Node) && 
          !button.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isClosing]);

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
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200); // Match the closing animation duration
  };

  const handleLinkClick = () => {
    closeMenu();
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
      {isOpen && <div className={`burger-overlay ${isClosing ? 'closing' : ''}`} />}

      {/* Menu */}
      <div id="burger-menu" className={`burger-menu ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <div className="burger-header">
          <h2>Explore</h2>
          <button 
            className="close-button"
            onClick={handleLinkClick}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="burger-content">
          {/* Navigation Links */}
          <div className="menu-section">
            <h3>NAVIGATION</h3>
            <div className="nav-links">
              <a href="/essays" onClick={handleLinkClick}>Essays</a>
              <a href="/projects" onClick={handleLinkClick}>Projects</a>
              <a href="/technical-writings" onClick={handleLinkClick}>Technical Writings</a>
            </div>
          </div>
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
          background: rgba(var(--color-primary-rgb), 0.1);
        }

        .burger-line {
          width: 20px;
          height: 2px;
          background: var(--color-text, #333);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: center;
        }

        .burger-button.open .burger-line {
          /* Keep the burger lines as they are when menu is open */
          background: var(--color-primary, #333);
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
          opacity: 1;
          transition: opacity 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .burger-overlay.closing {
          opacity: 0;
          transition: opacity 0.2s cubic-bezier(0.4, 0.0, 1, 1);
        }

        .burger-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: min(380px, 100vw);
          height: 100vh;
          background: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          transition: right 0.25s cubic-bezier(0.4, 0.0, 0.2, 1);
          z-index: 1002;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          border-top-left-radius: 16px;
          border-bottom-left-radius: 16px;
        }

        .burger-menu.closing {
          transition: right 0.2s cubic-bezier(0.4, 0.0, 1, 1);
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
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text, #333);
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .close-button:hover {
          background: rgba(var(--color-primary-rgb), 0.1);
          opacity: 1;
          transform: scale(1.1);
        }

        .close-button:active {
          transform: scale(0.95);
        }

        .close-button svg {
          transition: transform 0.3s ease;
        }

        .close-button:hover svg {
          transform: rotate(90deg);
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
          color: var(--color-primary);
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
          color: var(--color-primary);
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