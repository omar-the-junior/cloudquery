import type { Route } from "./+types/api.maps";

// This route handles Google Maps API requests server-side
export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Server-side only!

    if (!apiKey) {
        throw new Response("Google Maps API key not configured", { status: 500 });
    }

    // Extract the Google Maps API URL from query params
    const mapsUrl = url.searchParams.get('url');
    if (!mapsUrl) {
        throw new Response("Missing maps URL parameter", { status: 400 });
    }

    try {
        // Proxy the request to Google Maps API with server-side API key
        const response = await fetch(`${mapsUrl}&key=${apiKey}`);
        const data = await response.json();

        return Response.json(data);
    } catch (error) {
        console.error('Google Maps API error:', error);
        throw new Response("Failed to fetch map data", { status: 500 });
    }
}

