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

  const searchEngine = useMemo(() => new SearchEngine(posts), [posts]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const searchResults = searchEngine.search(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, searchEngine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      window.location.href = results[0].item.url;
    }
  };

  const highlightMatch = (text: string, matches?: any[]) => {
    if (!matches || matches.length === 0) return text;
    
    let highlightedText = text;
    const match = matches.find(m => m.key === 'title' || m.key === 'description');
    
    if (match && match.indices) {
      const indices = match.indices[0];
      if (indices && indices.length === 2) {
        const [start, end] = indices;
        highlightedText = 
          text.slice(0, start) + 
          `<mark class="search-highlight">${text.slice(start, end + 1)}</mark>` + 
          text.slice(end + 1);
      }
    }
    
    return highlightedText;
  };

  return (
    <div className={`search-container ${className}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
      </form>

      {(isFocused || query) && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">Searching...</div>
          ) : query && results.length === 0 ? (
            <div className="search-no-results">No results found for "{query}"</div>
          ) : (
            <div className="search-results-list">
              {results.slice(0, 10).map((result, index) => (
                <a 
                  key={result.item.id} 
                  href={result.item.url}
                  className="search-result-item"
                >
                  <div className="search-result-content">
                    <h3 
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
                        {new Date(result.item.publishDate).toLocaleDateString()}
                      </span>
                      {result.item.tags.length > 0 && (
                        <div className="search-result-tags">
                          {result.item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="search-result-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 