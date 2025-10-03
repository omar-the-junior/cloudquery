import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { DatePicker } from '~/components/ui/date-picker';
import { Activity, Calendar, FileText, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocationMap } from './LocationMap';

interface WeatherQueryData {
    latitude: number;
    longitude: number;
    date: Date | undefined;
    activity: string;
    description?: string;
}

interface WeatherQueryFormProps {
    onSubmit?: (data: WeatherQueryData) => void;
}

export const WeatherQueryForm = ({ onSubmit }: WeatherQueryFormProps) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<WeatherQueryData>({
        latitude: 0,
        longitude: 0,
        date: undefined,
        activity: '',
        description: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof WeatherQueryData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof WeatherQueryData, string>> = {};

        // Validate latitude
        if (
            formData.latitude === 0 ||
            formData.latitude < -90 ||
            formData.latitude > 90
        ) {
            newErrors.latitude = 'Latitude must be between -90 and 90';
        }

        // Validate longitude
        if (
            formData.longitude === 0 ||
            formData.longitude < -180 ||
            formData.longitude > 180
        ) {
            newErrors.longitude = 'Longitude must be between -180 and 180';
        }

        // Validate date
        if (!formData.date) {
            newErrors.date = 'Date is required';
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (formData.date <= today) {
                newErrors.date = 'Date must be after today';
            }
        }

        // Validate activity
        if (!formData.activity.trim()) {
            newErrors.activity = 'Activity is required';
        } else if (formData.activity.length > 255) {
            newErrors.activity = 'Activity must be 255 characters or less';
        }

        // Validate description
        if (formData.description && formData.description.length > 1000) {
            newErrors.description =
                'Description must be 1000 characters or less';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // For React Router, we'll navigate to the results page with the form data
        // In a real app, you might want to store this in a state management solution
        // or pass it through URL params
        const searchParams = new URLSearchParams({
            latitude: formData.latitude.toString(),
            longitude: formData.longitude.toString(),
            date: formData.date?.toISOString().split('T')[0] || '',
            activity: formData.activity,
            ...(formData.description && { description: formData.description }),
        });

        // Navigate to results page with form data
        navigate(`/weather/results?${searchParams.toString()}`);

        // Call the onSubmit callback if provided
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleLocationChange = (lat: number, lng: number) => {
        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
        }));
        // Clear location errors when location is updated
        if (errors.latitude || errors.longitude) {
            setErrors((prev) => ({
                ...prev,
                latitude: undefined,
                longitude: undefined,
            }));
        }
    };

    const handleInputChange = (
        field: keyof WeatherQueryData,
        value: string | number | Date | undefined,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear field error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    return (
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Selection */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">
                            Location Selection
                        </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Click on the map to select your location. The
                        coordinates will be automatically filled.
                    </p>

                    <LocationMap
                        onLocationChange={handleLocationChange}
                        initialLat={formData.latitude}
                        initialLng={formData.longitude}
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input
                                id="latitude"
                                type="number"
                                step="any"
                                min="-90"
                                max="90"
                                value={formData.latitude || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        'latitude',
                                        parseFloat(e.target.value) || 0,
                                    )
                                }
                                className={
                                    errors.latitude ? 'border-destructive' : ''
                                }
                                placeholder="Enter latitude (-90 to 90)"
                            />
                            {errors.latitude && (
                                <p className="text-sm text-destructive">
                                    {errors.latitude}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input
                                id="longitude"
                                type="number"
                                step="any"
                                min="-180"
                                max="180"
                                value={formData.longitude || ''}
                                onChange={(e) =>
                                    handleInputChange(
                                        'longitude',
                                        parseFloat(e.target.value) || 0,
                                    )
                                }
                                className={
                                    errors.longitude ? 'border-destructive' : ''
                                }
                                placeholder="Enter longitude (-180 to 180)"
                            />
                            {errors.longitude && (
                                <p className="text-sm text-destructive">
                                    {errors.longitude}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">
                            Date Selection
                        </Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Select Date</Label>
                        <DatePicker
                            date={formData.date}
                            onDateChange={(date) => handleInputChange('date', date)}
                            placeholder="Pick a date"
                            className={errors.date ? 'border-destructive' : ''}
                        />
                        {errors.date && (
                            <p className="text-sm text-destructive">
                                {errors.date}
                            </p>
                        )}
                    </div>
                </div>

                {/* Activity Information */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">
                            Activity Information
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="activity">Activity Name *</Label>
                        <Input
                            id="activity"
                            type="text"
                            value={formData.activity}
                            onChange={(e) =>
                                handleInputChange('activity', e.target.value)
                            }
                            className={
                                errors.activity ? 'border-destructive' : ''
                            }
                            placeholder="e.g., Outdoor Wedding, Hiking Trip, Picnic"
                            maxLength={255}
                        />
                        {errors.activity && (
                            <p className="text-sm text-destructive">
                                {errors.activity}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="description">
                                Description (Optional)
                            </Label>
                        </div>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                handleInputChange('description', e.target.value)
                            }
                            className={`min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ${errors.description ? 'border-destructive' : ''}`}
                            placeholder="Describe your activity in detail (e.g., outdoor wedding with 100 guests, hiking trail in mountains, etc.)"
                            maxLength={1000}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description}
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {formData.description?.length || 0}/1000 characters
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        disabled={isSubmitting}
                        className="min-w-[200px]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Analyzing Weather...
                            </>
                        ) : (
                            'Get Weather Analysis'
                        )}
                    </Button>
                </div>
            </form>
        </Card>
    );
};