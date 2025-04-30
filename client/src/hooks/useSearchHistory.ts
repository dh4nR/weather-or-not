import { useState, useEffect } from 'react';

interface SearchLocation {
  latitude: string;
  longitude: string;
  name: string;
}

const STORAGE_KEY = 'whether-or-not-search-history';
const MAX_HISTORY_ITEMS = 5;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchLocation[]>([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading search history from localStorage:', error);
    }
  }, []);

  // Add a new search to history
  const addToHistory = (location: SearchLocation) => {
    setSearchHistory(prevHistory => {
      // Remove any existing entries with the same name
      const filteredHistory = prevHistory.filter(item => item.name !== location.name);
      
      // Add new location to the start of the array
      const updatedHistory = [location, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('Error saving search history to localStorage:', error);
      }
      
      return updatedHistory;
    });
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory
  };
}