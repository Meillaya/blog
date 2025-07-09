import React, { useState, useEffect, useMemo } from 'react';
import { SearchEngine, type SearchablePost, type SearchResult } from '../utils/search';

interface SearchComponentProps {
  posts: SearchablePost[];
  placeholder?: string;
  className?: string;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({ 
  posts, 
  placeholder = "Search posts...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchEngine = useMemo(() => new SearchEngine(posts), [posts]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const searchResults = searchEngine.search(query);
      setResults(searchResults);
      setShowResults(true);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchEngine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      window.location.href = results[0].item.url;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query && results.length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setShowResults(false);
    }, 200);
  };

  const handleResultClick = (url: string) => {
    setShowResults(false);
    window.location.href = url;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      window.location.href = results[0].item.url;
    }
  };

  const highlightMatch = (text: string, matches?: { key: string; value: string[] }[]) => {
    if (!text || !matches || matches.length === 0) {
      return text;
    }

    // Collect unique, non-empty terms from matches
    const terms: string[] = [];
    matches.forEach(match => {
      if (Array.isArray(match.value)) {
        match.value.forEach(term => {
          if (term && term.length > 0 && !terms.includes(term)) {
            terms.push(term);
          }
        });
      }
    });

    if (terms.length === 0) return text;

    // Sort terms by length (longest first) to prevent nested highlighting
    terms.sort((a, b) => b.length - a.length);

    // Escape special regex chars, inc. forward slash
    const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'));

    try {
      const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
      return text.replace(regex, match => `<mark class="search-highlight">${match}</mark>`);
    } catch {
      return text;
    }
  };

  return (
    <div className={`search-container ${className}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <div className="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
          />
          {query && (
            <button 
              type="button" 
              className="search-clear"
              onClick={() => setQuery('')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </form>

      {showResults && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <span>Searching...</span>
            </div>
          ) : query && results.length === 0 ? (
            <div className="search-no-results">
              <div className="no-results-icon">🔍</div>
              <p>No results found for <strong>"{query}"</strong></p>
              <small>Try different keywords or check your spelling</small>
            </div>
          ) : (
            <div className="search-results-list">
              {results.slice(0, 8).map((result) => (
                <div 
                  key={result.item.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result.item.url)}
                >
                  <div className="search-result-content">
                    <h4 
                      className="search-result-title"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(result.item.title, result.matches) 
                      }}
                    />
                    <p 
                      className="search-result-description"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(result.item.description, result.matches) 
                      }}
                    />
                    <div className="search-result-meta">
                      <span className="search-result-collection">{result.item.collection}</span>
                      <span className="search-result-date">
                        {new Date(result.item.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {result.item.tags.length > 0 && (
                        <div className="search-result-tags">
                          {result.item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="search-result-tag">{tag}</span>
                          ))}
                          {result.item.tags.length > 2 && (
                            <span className="search-result-tag more">+{result.item.tags.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};