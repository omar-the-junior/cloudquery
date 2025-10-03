import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing.tsx"),
    route("home", "routes/home.tsx"),
    route("weather/results", "routes/weather-results.tsx"),
] satisfies RouteConfig;
