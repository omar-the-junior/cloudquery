import type { Route } from "./+types/weather-results";
import { WeatherResults } from '~/components/WeatherResults';
import { useSearchParams, useLoaderData, useNavigation } from 'react-router';

interface WeatherAnalysisResult {
    suitability_score: number;
    confidence_rating: string;
    weather_conditions: {
        temperature: {
            average: number;
            min: number;
            max: number;
            percentile_90?: number;
            percentile_10?: number;
        };
        precipitation: {
            average: number;
            max: number;
            probability_of_rain: number;
        };
        wind: {
            average_speed: number;
            max_speed: number;
        };
        humidity: {
            average: number;
        };
    };
    recommendations: string[];
    risk_factors: string[];
}

interface WeatherAnalysisResponse {
    data?: WeatherAnalysisResult;
    error?: string;
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Get form data from URL params
    const formData = {
        latitude: parseFloat(searchParams.get('latitude') || '0'),
        longitude: parseFloat(searchParams.get('longitude') || '0'),
        date: searchParams.get('date') || '',
        activity: searchParams.get('activity') || '',
        description: searchParams.get('description') || '',
    };

    // Validate required fields
    if (!formData.latitude || !formData.longitude || !formData.date || !formData.activity) {
        return { error: 'Missing required form data' };
    }

    try {
        // Call the enhanced weather analysis API
        const response = await fetch('http://localhost:8001/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: formData.latitude,
                longitude: formData.longitude,
                target_date: formData.date,
                user_activity: formData.activity,
                user_activity_desc: formData.description || formData.activity,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'API returned unsuccessful response');
        }

        // Validate the data structure
        const data = result.data;
        if (!data || !data.weather_conditions) {
            throw new Error('Invalid data structure: weather_conditions is missing');
        }

        // Validate required weather condition properties
        const { weather_conditions } = data;
        if (!weather_conditions.temperature || !weather_conditions.precipitation ||
            !weather_conditions.wind || !weather_conditions.humidity) {
            throw new Error('Invalid data structure: missing required weather condition properties');
        }

        return data;
    } catch (err) {
        console.error('Weather analysis error:', err);
        return {
            error: err instanceof Error ? err.message : 'An error occurred while analyzing weather data'
        };
    }
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "CloudQuery - Weather Results" },
        { name: "description", content: "Your personalized weather analysis results" },
    ];
}

export default function WeatherResultsPage() {
    const [searchParams] = useSearchParams();
    const loaderData = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    // Get form data from URL params
    const formData = {
        latitude: parseFloat(searchParams.get('latitude') || '0'),
        longitude: parseFloat(searchParams.get('longitude') || '0'),
        date: searchParams.get('date') || '',
        activity: searchParams.get('activity') || '',
        description: searchParams.get('description') || '',
    };

    // Validate required fields
    const hasRequiredData = formData.latitude && formData.longitude && formData.date && formData.activity;

    // Determine states
    const isLoading = Boolean(navigation.state === 'loading' || (!loaderData && hasRequiredData));
    const error = !hasRequiredData
        ? 'Missing required form data'
        : loaderData?.error
            ? loaderData.error
            : undefined;
    const weatherData = loaderData && !loaderData.error ? loaderData as WeatherAnalysisResult : undefined;

    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                        Weather Analysis Results
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Your personalized weather insights based on NASA historical data
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <WeatherResults
                        data={weatherData}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </div>
        </main>
    );
}
