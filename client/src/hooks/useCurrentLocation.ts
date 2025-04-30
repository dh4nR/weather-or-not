
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Location {
  latitude: string;
  longitude: string;
  error?: string;
  loading: boolean;
}

/**
 * Hook to get user's current geolocation with IP fallback
 */
export function useCurrentLocation() {
  const [location, setLocation] = useState<Location>({
    latitude: '',
    longitude: '',
    loading: true
  });

  async function getLocationFromIP() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      setLocation({
        latitude: response.data.latitude.toString(),
        longitude: response.data.longitude.toString(),
        loading: false
      });
    } catch (error) {
      setLocation({
        latitude: '',
        longitude: '',
        error: 'Could not determine location',
        loading: false
      });
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      getLocationFromIP();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
          loading: false
        });
      },
      () => {
        // If browser geolocation fails, try IP-based location
        getLocationFromIP();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return location;
}
