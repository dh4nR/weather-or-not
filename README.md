# Whether or Not

A dynamic weather-based activity recommendation application that provides intelligent insights for outdoor activities like skiing, surfing, and sightseeing across different locations.

## Demo

Try out Whether or Not at: https://weather-or-not.replit.app/

Developer site (pre-release working code): [Here](https://266e5c43-685e-495d-be16-8ee1601ef67d-00-2tccdj81uvd7y.spock.replit.dev)

## Features

- **Real-time Weather Forecasting**: Get up-to-date 7-day weather forecasts using the Open-Meteo API
- **Activity Scoring System**: Activities (skiing, surfing, outdoor/indoor sightseeing) are scored on a scale of 1-5 stars based on weather conditions
- **Location Search**: Search for any city or town worldwide
- **Search History**: Automatically saves your five most recent searches
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

## Repository Structure
- **client/**: Contains the frontend application code. ￼
- **server/**: Houses the backend server code. ￼
- **shared/**: Includes shared utilities and types used across the client and server.
- **README.**md: Provides an overview of the project, its features, and setup instructions

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend**: Node.js, Express
- **State Management**: React Query
- **APIs**: Open-Meteo API for weather data and geocoding

## Technical Choices

This project was built with performance, developer experience, and type safety in mind:

- **Vite (Frontend Build Tool)**: Offers fast development builds and modern tooling for a responsive developer workflow.
- **Tailwind CSS**: Enables rapid UI development with consistent styling using utility-first classes.
- **Fastify (Backend Framework)**: Chosen for its high performance and lightweight nature compared to alternatives like Express.
- **TypeScript (Full Stack)**: Provides strong typing and compile-time error checking across both client and server.
- **Drizzle ORM**: A modern, lightweight ORM with SQL-like syntax and full TypeScript support.
- **Monorepo Architecture**: Allows sharing types and logic across frontend and backend via the `shared/` directory, reducing duplication and bugs.

## Why These Approaches and Technologies?

### Vite (Frontend Build Tool)
**Why?** Traditional bundlers like Webpack can be slow, especially for larger apps. Vite was chosen for its fast startup, instant hot module reloading, and native support for modern JavaScript.  
**Outcome:** Greatly improved developer experience and faster feedback loops during frontend development.

### Tailwind CSS
**Why?** Tailwind’s utility-first design encourages building interfaces quickly without leaving your HTML. It removes the need for naming CSS classes and managing large stylesheets.  
**Outcome:** Faster UI prototyping, consistent styling, and minimal custom CSS.

### Fastify (Backend Framework)
**Why?** Fastify is significantly faster than Express and has better built-in support for schema validation, plugins, and performance monitoring.  
**Outcome:** A backend that is both fast and modular, with clear data validation and strong performance.

### TypeScript (Full Stack)
**Why?** TypeScript provides static typing, better tooling, and helps catch bugs at compile time rather than at runtime.  
**Outcome:** Safer, more predictable code — especially important in a project with shared logic between frontend and backend.

### Drizzle ORM
**Why?** Drizzle offers SQL-like syntax in TypeScript while maintaining type safety. It’s lighter and easier to reason about than heavier ORMs like Prisma or TypeORM.  
**Outcome:** Cleaner, more maintainable database queries with full IDE autocompletion and type inference.

### Monorepo with Shared Types
**Why?** Keeping frontend and backend code in a single repo simplifies dependency management and enables shared logic (e.g. validation schemas, scoring functions).  
**Outcome:** Less duplication, easier updates, and fewer bugs when working across the stack.

### Replit (Prototyping and Live Demo)
**Why?** Replit allows you to prototype and deploy small apps quickly with no infrastructure setup.  
**Outcome:** Fast iteration, instant feedback, and an easy way to share the live app during development or demos.

## Setup Instructions

To set up and run the application locally:

1. Clone this repository
   ```
   git clone https://github.com/dh4nR/weather-or-not.git
   cd weather-or-not
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API References

This application uses the following external APIs:

- [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs) - For weather forecasts
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - For location search

## Credits

- Whether or Not was created by C4
- Weather data provided by Open-Meteo API

## License

Copyright © 2025 C4. All rights reserved.
