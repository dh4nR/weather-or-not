import { useState, useEffect } from 'react';

export interface Location {
  latitude: string;
  longitude: string;
  error?: string;
  loading: boolean;
}

/**
 * Hook to get user's current geolocation
 * @returns User's current location coordinates
 */
export function useCurrentLocation() {
  const [location, setLocation] = useState<Location>({
    latitude: '',
    longitude: '',
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: '',
        longitude: '',
        error: 'Geolocation is not supported by your browser',
        loading: false
      });
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
      (error) => {
        setLocation({
          latitude: '',
          longitude: '',
          error: `Unable to retrieve your location: ${error.message}`,
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return location;
}