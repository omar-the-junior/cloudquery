import type { Route } from "./+types/weather-results";
import { WeatherResults } from '~/components/WeatherResults';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

interface WeatherAnalysisResult {
    suitability_score: number;
    confidence_rating: string;
    weather_conditions: {
        temperature: {
            average: number;
            min: number;
            max: number;
            percentile_90: number;
            percentile_10: number;
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

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "CloudQuery - Weather Results" },
        { name: "description", content: "Your personalized weather analysis results" },
    ];
}

export default function WeatherResultsPage() {
    const [searchParams] = useSearchParams();
    const [weatherData, setWeatherData] = useState<WeatherAnalysisResult | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Get form data from URL params
                const formData = {
                    latitude: parseFloat(searchParams.get('latitude') || '0'),
                    longitude: parseFloat(searchParams.get('longitude') || '0'),
                    date: searchParams.get('date') || '',
                    activity: searchParams.get('activity') || '',
                    description: searchParams.get('description') || '',
                };

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Mock response data - Generate different scenarios based on activity
                const activity = formData.activity.toLowerCase();
                let mockResult: WeatherAnalysisResult;

                if (activity.includes('wedding') || activity.includes('outdoor')) {
                    // Excellent weather for outdoor events
                    mockResult = {
                        suitability_score: 85,
                        confidence_rating: "Very High",
                        weather_conditions: {
                            temperature: {
                                average: 24.2,
                                min: 18.5,
                                max: 29.8,
                                percentile_90: 27.2,
                                percentile_10: 20.1,
                            },
                            precipitation: {
                                average: 1.2,
                                max: 8.5,
                                probability_of_rain: 15,
                            },
                            wind: {
                                average_speed: 6.8,
                                max_speed: 12.3,
                            },
                            humidity: {
                                average: 58,
                            },
                        },
                        recommendations: [
                            "Excellent weather conditions for your outdoor event",
                            "Perfect temperature range for guest comfort",
                            "Very low chance of rain - ideal for outdoor activities",
                            "Gentle breeze will keep guests comfortable",
                            "Consider outdoor ceremony and reception"
                        ],
                        risk_factors: [
                            "Minimal risk factors identified",
                            "Slight chance of afternoon showers"
                        ],
                    };
                } else if (activity.includes('hiking') || activity.includes('camping')) {
                    // Good weather for outdoor activities
                    mockResult = {
                        suitability_score: 72,
                        confidence_rating: "High",
                        weather_conditions: {
                            temperature: {
                                average: 19.8,
                                min: 12.3,
                                max: 26.5,
                                percentile_90: 24.1,
                                percentile_10: 15.2,
                            },
                            precipitation: {
                                average: 3.8,
                                max: 22.1,
                                probability_of_rain: 35,
                            },
                            wind: {
                                average_speed: 12.5,
                                max_speed: 25.8,
                            },
                            humidity: {
                                average: 72,
                            },
                        },
                        recommendations: [
                            "Good conditions for outdoor activities",
                            "Pack rain gear for potential afternoon showers",
                            "Start early to avoid afternoon wind",
                            "Bring layers for temperature changes",
                            "Check trail conditions before departure"
                        ],
                        risk_factors: [
                            "Moderate chance of precipitation",
                            "Stronger winds in afternoon",
                            "Temperature drops significantly at night"
                        ],
                    };
                } else {
                    // Default scenario - moderate weather
                    mockResult = {
                        suitability_score: 78,
                        confidence_rating: "High",
                        weather_conditions: {
                            temperature: {
                                average: 22.5,
                                min: 15.2,
                                max: 28.8,
                                percentile_90: 26.4,
                                percentile_10: 18.1,
                            },
                            precipitation: {
                                average: 2.3,
                                max: 15.7,
                                probability_of_rain: 25,
                            },
                            wind: {
                                average_speed: 8.2,
                                max_speed: 18.5,
                            },
                            humidity: {
                                average: 65,
                            },
                        },
                        recommendations: [
                            "Good weather conditions for your activity",
                            "Consider bringing light layers for temperature variations",
                            "Low chance of precipitation - minimal rain gear needed",
                            "Moderate wind conditions suitable for most activities",
                            "Plan for slight humidity variations"
                        ],
                        risk_factors: [
                            "Slight temperature variation between day and night",
                            "Moderate humidity levels may affect comfort"
                        ],
                    };
                }

                setWeatherData(mockResult);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, [searchParams]);

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
