# Whether or Not

A dynamic weather-based activity recommendation application that provides intelligent insights for outdoor activities like skiing, surfing, and sightseeing across different locations.

## Demo

Try out Whether or Not at: https://weather-or-not.replit.app/

## Features

- **Real-time Weather Forecasting**: Get up-to-date 7-day weather forecasts using the Open-Meteo API
- **Activity Scoring System**: Activities (skiing, surfing, outdoor/indoor sightseeing) are scored on a scale of 1-5 stars based on weather conditions
- **Location Search**: Search for any city or town worldwide
- **Search History**: Automatically saves your five most recent searches
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark Theme**: Comfortable viewing experience with a modern dark theme

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Node.js, Express
- **State Management**: React Query
- **APIs**: Open-Meteo API for weather data and geocoding

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared types and schemas between client and server

## API References

This application uses the following external APIs:

- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs) - For weather forecasts
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - For location search

## Credits

- Whether or Not was created by C4
- Weather data provided by Open-Meteo API

## License

Copyright © 2025 C4. All rights reserved.