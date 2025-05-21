import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { searchLocations } from '../utils/api';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
  onGeolocationRequest: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onLocationSelect,
  onGeolocationRequest,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{
    id: string;
    name: string;
    country: string;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchLocations(query);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    onLocationSelect(location);
    setQuery(location);
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center">
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a location..."
          className="w-full py-3 pl-10 pr-12 bg-white/20 backdrop-blur-md 
                    rounded-full text-white placeholder-white/60 outline-none 
                    border border-white/30 focus:border-white/50 transition-all"
          onFocus={() => query.trim() && setShowResults(true)}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        <Search className="absolute left-3 text-white/70" size={20} />
        
        <div className="absolute right-3 flex items-center space-x-1">
          {query && (
            <button 
              onClick={clearSearch}
              className="p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onGeolocationRequest}
            className="p-1 text-white/70 hover:text-white transition-colors"
            aria-label="Use my location"
          >
            <MapPin size={20} />
          </button>
        </div>
      </div>

      {showResults && (
        <motion.div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/20 
                    backdrop-blur-md rounded-lg border border-white/30 
                    shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isSearching ? (
            <div className="p-4 text-center text-white">Searching...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <motion.li
                  key={result.id}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <button
                    className="w-full text-left px-4 py-3 text-white hover:bg-white/10 
                              transition-colors cursor-pointer flex items-center"
                    onClick={() => handleLocationSelect(`${result.name}, ${result.country}`)}
                  >
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span>{result.name}, {result.country}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-center text-white">No locations found</div>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;