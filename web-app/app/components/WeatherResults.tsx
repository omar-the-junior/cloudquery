import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';
import {
    Cloud,
    Droplets,
    Sun,
    Thermometer,
    TrendingDown,
    TrendingUp,
    Wind,
} from 'lucide-react';

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
    historical_analysis: {
        total_years_analyzed: number;
        favorable_years: number;
        unfavorable_years: number;
        trend: string;
    };
    recommendations: string[];
    risk_factors: string[];
}

interface WeatherResultsProps {
    data?: WeatherAnalysisResult;
    isLoading?: boolean;
    error?: string;
}

export const WeatherResults = ({
    data,
    isLoading,
    error,
}: WeatherResultsProps) => {
    if (isLoading) {
        return (
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <h3 className="text-lg font-semibold">
                            Analyzing Weather Data
                        </h3>
                        <p className="text-muted-foreground">
                            Processing NASA historical data for your location
                            and activity...
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/30 bg-gradient-to-br from-card to-destructive/5 p-8 backdrop-blur-sm">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 p-3">
                        <Cloud className="h-6 w-6 text-destructive" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-destructive">
                        Analysis Error
                    </h3>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </Card>
        );
    }

    if (!data) {
        return null;
    }

    const getScoreColor = (score: number) => {
        if (score >= 80)
            return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
        if (score >= 60)
            return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 70) return <TrendingUp className="h-5 w-5" />;
        return <TrendingDown className="h-5 w-5" />;
    };

    return (
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 backdrop-blur-sm">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
                        Weather Analysis Results
                    </h2>
                    <p className="text-muted-foreground">
                        Based on {data.historical_analysis.total_years_analyzed}{' '}
                        years of NASA historical data
                    </p>
                </div>

                {/* Suitability Score */}
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                {getScoreIcon(data.suitability_score)}
                                <span className="text-3xl font-bold">
                                    {data.suitability_score}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Suitability Score
                            </div>
                        </div>
                    </div>
                    <Badge
                        className={`${getScoreColor(data.suitability_score)} border-0`}
                    >
                        {data.confidence_rating} Confidence
                    </Badge>
                </div>

                {/* Weather Conditions Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Temperature */}
                    <Card className="border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/20">
                                <Thermometer className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="font-semibold">Temperature</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Average:
                                </span>
                                <span>
                                    {data.weather_conditions.temperature.average.toFixed(
                                        1,
                                    )}
                                    °C
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Range:
                                </span>
                                <span>
                                    {data.weather_conditions.temperature.min.toFixed(
                                        0,
                                    )}
                                    ° -{' '}
                                    {data.weather_conditions.temperature.max.toFixed(
                                        0,
                                    )}
                                    °
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Precipitation */}
                    <Card className="border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/20">
                                <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold">Precipitation</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Rain Chance:
                                </span>
                                <span>
                                    {data.weather_conditions.precipitation.probability_of_rain.toFixed(
                                        0,
                                    )}
                                    %
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Max Daily:
                                </span>
                                <span>
                                    {data.weather_conditions.precipitation.max.toFixed(
                                        1,
                                    )}
                                    mm
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Wind */}
                    <Card className="border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/20">
                                <Wind className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="font-semibold">Wind</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Average:
                                </span>
                                <span>
                                    {data.weather_conditions.wind.average_speed.toFixed(
                                        1,
                                    )}{' '}
                                    km/h
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Max:
                                </span>
                                <span>
                                    {data.weather_conditions.wind.max_speed.toFixed(
                                        1,
                                    )}{' '}
                                    km/h
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Overall Conditions */}
                    <Card className="border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/20">
                                <Sun className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="font-semibold">Conditions</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Humidity:
                                </span>
                                <span>
                                    {data.weather_conditions.humidity.average.toFixed(
                                        0,
                                    )}
                                    %
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Trend:
                                </span>
                                <span className="capitalize">
                                    {data.historical_analysis.trend}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Historical Analysis */}
                <Card className="border-accent/30 bg-gradient-to-br from-card to-accent/5 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                        <Cloud className="h-5 w-5 text-accent" />
                        Historical Analysis
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                                {data.historical_analysis.favorable_years}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Favorable Years
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-destructive">
                                {data.historical_analysis.unfavorable_years}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Unfavorable Years
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-accent">
                                {data.historical_analysis.total_years_analyzed}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Total Years
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Recommendations and Risk Factors */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recommendations */}
                    <Card className="border-green-200 bg-gradient-to-br from-card to-green-50 p-6 backdrop-blur-sm dark:border-green-800 dark:to-green-900/10">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400">
                            <TrendingUp className="h-5 w-5" />
                            Recommendations
                        </h3>
                        <ul className="space-y-2">
                            {data.recommendations.map(
                                (recommendation, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                                        {recommendation}
                                    </li>
                                ),
                            )}
                        </ul>
                    </Card>

                    {/* Risk Factors */}
                    {data.risk_factors.length > 0 && (
                        <Card className="border-red-200 bg-gradient-to-br from-card to-red-50 p-6 backdrop-blur-sm dark:border-red-800 dark:to-red-900/10">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-700 dark:text-red-400">
                                <TrendingDown className="h-5 w-5" />
                                Risk Factors
                            </h3>
                            <ul className="space-y-2">
                                {data.risk_factors.map((risk, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm"
                                    >
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                                        {risk}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>
            </div>
        </Card>
    );
};