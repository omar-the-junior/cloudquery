import { useEffect, useState } from 'react';

interface ClientOnlyMapProps {
    center: [number, number];
    zoom: number;
    coordinates: { lat: number; lng: number };
    onLocationChange: (lat: number, lng: number) => void;
}

export const ClientOnlyMap = ({ center, zoom, coordinates, onLocationChange }: ClientOnlyMapProps) => {
    const [isClient, setIsClient] = useState(false);
    const [MapComponent, setMapComponent] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);

        // Dynamically import Leaflet components only on client side
        const loadMap = async () => {
            try {
                const [
                    { MapContainer, TileLayer, Marker, Popup, useMapEvents },
                    L
                ] = await Promise.all([
                    import('react-leaflet'),
                    import('leaflet')
                ]);

                // Import CSS
                await import('leaflet/dist/leaflet.css');

                // Fix Leaflet default markers
                delete (L.Icon.Default.prototype as any)._getIconUrl;
                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                });

                // Custom marker icon
                const createCustomIcon = () => {
                    return L.divIcon({
                        className: 'custom-marker',
                        html: `
                            <div class="relative">
                                <div class="absolute -inset-2 animate-ping rounded-full bg-blue-500/30"></div>
                                <div class="absolute -inset-1 animate-pulse rounded-full bg-blue-500/20"></div>
                                <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl ring-2 ring-white">
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        `,
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                    });
                };

                // Map click handler component
                const MapClickHandler = ({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) => {
                    useMapEvents({
                        click: (e: any) => {
                            const { lat, lng } = e.latlng;
                            onLocationChange(lat, lng);
                        },
                    });
                    return null;
                };

                // Create the map component
                const MapComponent = () => (
                    <MapContainer
                        center={center}
                        zoom={zoom}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Map click handler */}
                        <MapClickHandler onLocationChange={onLocationChange} />

                        {/* Location marker */}
                        {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                            <Marker
                                position={[coordinates.lat, coordinates.lng]}
                                icon={createCustomIcon()}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <p className="font-semibold">Selected Location</p>
                                        <p className="text-sm text-muted-foreground">
                                            {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                );

                setMapComponent(() => MapComponent);
            } catch (error) {
                console.error('Failed to load map:', error);
            }
        };

        loadMap();
    }, [center, zoom, coordinates, onLocationChange]);

    if (!isClient || !MapComponent) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted/20">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    <span>Loading map...</span>
                </div>
            </div>
        );
    }

    return <MapComponent />;
};
