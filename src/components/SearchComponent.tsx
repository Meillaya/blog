import React, { useState, useEffect, useMemo } from 'react';
import { SearchEngine } from '../utils/search';
import type { SearchablePost, SearchResult } from '../utils/search';
import type { FuseResultMatch } from 'fuse.js';

// Add type declaration for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, data?: Record<string, any>) => void;
  }
}

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
      
      // Track search query
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', { name: 'search', query: query, results: searchResults.length });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchEngine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      // Track search result click
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', { 
          name: 'Search Result Click',
          query: query, 
          result: results[0].item.title,
          position: 1 
        });
      }
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

  const handleResultClick = (url: string, result: SearchResult, index: number) => {
    setShowResults(false);
    
    // Track search result click
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', { 
        name: 'Search Result Click',
        query: query, 
        result: result.item.title,
        position: index + 1 
      });
    }
    
    window.location.href = url;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      
      // Track search result click
      if (typeof window !== 'undefined' && window.va) {
        window.va('event', { 
          name: 'Search Result Click',
          query: query, 
          result: results[0].item.title,
          position: 1 
        });
      }
      
      window.location.href = results[0].item.url;
    }
  };

  const highlightMatch = (text: string, key: string, allMatches?: readonly FuseResultMatch[]) => {
    if (!text || !allMatches) {
      return text;
    }

    const keyMatches = allMatches.filter(m => m.key === key);
    if (!keyMatches.length) {
      return text;
    }

    const indices = keyMatches.flatMap(m => m.indices);

    if (indices.length === 0) return text;

    // Sort and merge overlapping/adjacent intervals
    indices.sort((a, b) => a[0] - b[0]);

    const mergedIndices: [number, number][] = [];
    if (indices.length > 0) {
      let current = [...indices[0]]; // Make a copy
      for (let i = 1; i < indices.length; i++) {
        const next = indices[i];
        if (next[0] <= current[1] + 1) {
          current[1] = Math.max(current[1], next[1]);
        } else {
          mergedIndices.push(current as [number, number]);
          current = [...next]; // Make a copy
        }
      }
      mergedIndices.push(current as [number, number]);
    }

    let result = '';
    let lastIndex = 0;
    mergedIndices.forEach(([start, end]) => {
      const endInclusive = end + 1;
      result += text.substring(lastIndex, start);
      result += `<mark class="search-highlight">${text.substring(start, endInclusive)}</mark>`;
      lastIndex = endInclusive;
    });
    result += text.substring(lastIndex);

    return result;
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
              {results.slice(0, 8).map((result, index) => (
                <div 
                  key={result.item.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result.item.url, result, index)}
                >
                  <div className="search-result-content">
                    <h4 
                      className="search-result-title"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(result.item.title, 'title', result.matches) 
                      }}
                    />
                    <p 
                      className="search-result-description"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(result.item.description, 'description', result.matches) 
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