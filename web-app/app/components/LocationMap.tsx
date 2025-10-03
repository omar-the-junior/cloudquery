import { Card } from '~/components/ui/card';
import { MapPin, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ClientOnlyMap } from './ClientOnlyMap';

interface LocationMapProps {
    onLocationChange: (lat: number, lng: number) => void;
    initialLat?: number;
    initialLng?: number;
}

export const LocationMap = ({
    onLocationChange,
    initialLat = 0,
    initialLng = 0,
}: LocationMapProps) => {
    const [coordinates, setCoordinates] = useState({
        lat: initialLat,
        lng: initialLng,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>([
        initialLat || 40.7128,
        initialLng || -74.0060,
    ]);
    const [zoom, setZoom] = useState(11);

    // Get user's current location
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ lat: latitude, lng: longitude });
                setMapCenter([latitude, longitude]);
                onLocationChange(latitude, longitude);
                setIsLoading(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                alert(
                    'Unable to retrieve your location. Please click on the map to select a location.',
                );
                setIsLoading(false);
            },
        );
    };

    // Handle map click
    const handleMapClick = (lat: number, lng: number) => {
        setCoordinates({ lat, lng });
        onLocationChange(lat, lng);
    };

    // Update coordinates when initial values change
    useEffect(() => {
        if (initialLat !== 0 || initialLng !== 0) {
            setCoordinates({ lat: initialLat, lng: initialLng });
            setMapCenter([initialLat, initialLng]);
        }
    }, [initialLat, initialLng]);

    return (
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6 shadow-lg">
            <div className="space-y-6">
                {/* Map Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground">Interactive Map</h3>
                            <p className="text-sm text-muted-foreground">Select your location precisely</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/20 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <MapPin className="h-4 w-4" />
                        )}
                        {isLoading ? 'Getting Location...' : 'Use My Location'}
                    </button>
                </div>

                {/* Map Container */}
                <div className="relative h-80 w-full overflow-hidden rounded-xl border border-border shadow-lg">
                    <ClientOnlyMap
                        center={mapCenter}
                        zoom={zoom}
                        coordinates={coordinates}
                        onLocationChange={handleMapClick}
                    />

                    {/* Instructions */}
                    <div className="absolute left-4 top-4 rounded-lg bg-background/95 px-3 py-2 text-sm text-muted-foreground backdrop-blur-md border border-border/50 shadow-lg">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Click to select location</span>
                        </div>
                    </div>
                </div>

                {/* Coordinates Display */}
                <div className="rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 p-4 border border-border/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <span className="font-semibold text-foreground">Selected Coordinates</span>
                                <p className="text-xs text-muted-foreground">Precise location data</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wide">Latitude</div>
                                <div className="font-mono text-lg font-semibold text-foreground">
                                    {coordinates.lat.toFixed(6)}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-wide">Longitude</div>
                                <div className="font-mono text-lg font-semibold text-foreground">
                                    {coordinates.lng.toFixed(6)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Note */}
                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                    <div className="flex items-start gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-green-900 dark:text-green-100">OpenStreetMap Integration</p>
                            <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                                Powered by React Leaflet and OpenStreetMap. No API keys required - completely free and open source!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};