// Route definitions for React Router v7
// This replaces the Laravel/Inertia route system

export const routes = {
    // Public routes
    landing: () => '/',
    home: () => '/home',

    // Auth routes
    login: () => '/login',
    register: () => '/register',
    logout: () => '/logout',

    // Protected routes
    dashboard: () => '/dashboard',

    // Weather routes
    weatherResults: () => '/weather/results',

    // API routes
    weatherQuery: () => '/api/weather/query',
} as const;

// Helper function to get route URL
export const getRouteUrl = (route: keyof typeof routes) => routes[route]();

// Type-safe route definitions
export type RouteKey = keyof typeof routes;
