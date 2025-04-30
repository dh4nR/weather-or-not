
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
      console.log('Attempting to get location from IP...');
      const response = await axios.get('https://ipapi.co/json/');
      console.log('IP Location response:', response.data);
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

    console.log('Requesting browser geolocation...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Browser geolocation success:', position.coords);
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
