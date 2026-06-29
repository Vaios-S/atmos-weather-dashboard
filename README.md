# Atmos Weather Dashboard

Atmos is a premium weather application built with React, Vite and Tailwind CSS that provides real-time weather information through a clean, atmospheric interface inspired by modern operating system design. The application combines weather search, location-based forecasts, favorites management, authentication and dynamic themes into a polished user experience.

## Overview

Atmos allows users to search for real-time weather information by city, view detailed weather data, save favorite cities, switch between Celsius and Fahrenheit, manage recent searches, and use light/dark theme mode.

This project was built as a final React project and focuses on React fundamentals, routing, Context API, reducers, local storage persistence, API integration, reusable components, and testing.

## Features

- Detect user's current location using the Browser Geolocation API
- Display current weather based on the user's location on application startup
- Search current weather by city
- View temperature, feels like, humidity, wind speed, pressure, min/max temperature, sunrise, sunset, weather description and icon
- City details page using URL parameters
- Save and remove favorite cities per user
- Recent searches per user
- Toggle between Celsius and Fahrenheit
- Light/Dark theme using Context API
- Protected routes
- Local authentication using localStorage
- Persistent users, favorites, recent searches, theme and unit preferences
- Dynamic weather backgrounds
- Responsive layout with Tailwind CSS
- 404 Not Found page
- Premium glassmorphism UI inspired by modern operating systems
- 5-day weather forecast
- Animated UI transitions using Framer Motion
- Premium responsive layout for desktop and mobile
- Dynamic weather backgrounds based on current condition

## Technologies

- React
- Vite
- React Router
- Tailwind CSS
- Context API
- useReducer
- Axios
- OpenWeatherMap API
- localStorage
- Vitest
- React Testing Library
- Framer Motion

## Local Authentication Note

This project uses a simple local authentication flow for educational purposes.

Users are stored in the browser's localStorage, and login is handled by checking the registered email and password against the stored users.

In a real production application, passwords should never be stored in localStorage. A secure backend or authentication service such as Firebase Authentication, Auth0, or a custom server with hashed passwords should be used instead.

## State Management

The project uses React Context API together with useReducer.

This approach was chosen because the application has shared state across multiple pages, but it is still small enough that Redux is not required for the first version.

The state is separated by concern:

- Auth state handles users, current user, favorites and recent searches.
- Weather state handles current weather, loading, error and selected unit.
- Theme state handles light/dark mode.

This keeps the logic organized and avoids unnecessary prop drilling.

## Project Setup

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install the project dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your OpenWeatherMap API key:

```env
VITE_API_KEY=your_openweathermap_api_key
```

You can obtain a free API key from:

https://openweathermap.org/api

Start the development server:

```bash
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```

## Running Tests

Run the test suite:

```bash
npm run test
```

If you prefer using the Vitest user interface:

```bash
npm run test:ui
```
