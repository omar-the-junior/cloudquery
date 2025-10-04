# Frontend Integration Test Guide

## Testing the Enhanced Weather Analysis Integration

### Prerequisites
1. Make sure the analytics engine is running on `http://localhost:8001`
2. Ensure you have a valid `GEMINI_API_KEY` in your `.env` file
3. Start the web app development server

### Test Steps

1. **Start the Analytics Engine**
   ```bash
   cd analytics-engine
   python run.py
   ```

2. **Start the Web App**
   ```bash
   cd web-app
   npm run dev
   ```

3. **Test the Integration**
   - Navigate to the weather query form
   - Fill in the following test data:
     - **Location**: Click on the map or enter coordinates (e.g., 40.7128, -74.0060 for NYC)
     - **Date**: Select a future date
     - **Activity**: Enter "Outdoor Picnic"
     - **Description**: Enter "A casual picnic in Central Park with family"
   - Click "Get Weather Analysis"

4. **Expected Results**
   - The form should navigate to the results page
   - You should see a loading state while the API processes
   - The results should display:
     - Suitability score (1-100)
     - Confidence rating (High/Medium/Low Confidence)
     - Weather conditions (temperature, precipitation, wind, humidity)
     - AI-generated recommendations
     - AI-generated risk factors

### Test Cases

#### Test Case 1: Outdoor Wedding
- **Activity**: "Outdoor Wedding"
- **Description**: "Beach wedding ceremony and reception"
- **Expected**: Should show high suitability score and wedding-specific recommendations

#### Test Case 2: Hiking Trip
- **Activity**: "Hiking"
- **Description**: "Day hike in the mountains"
- **Expected**: Should show moderate suitability score and hiking-specific recommendations

#### Test Case 3: Picnic
- **Activity**: "Picnic"
- **Description**: "Family picnic in the park"
- **Expected**: Should show weather-appropriate suitability score and picnic-specific recommendations

### Troubleshooting

#### API Connection Issues
- Check that the analytics engine is running on port 8001
- Verify the API endpoint is accessible: `http://localhost:8001/health`
- **CORS Issues**: If you see "NetworkError" or "OPTIONS 405 Method Not Allowed", restart the analytics engine server after the CORS middleware was added

#### LLM Enhancement Issues
- Check that `GEMINI_API_KEY` is set in the `.env` file
- Verify the API key is valid and has proper permissions
- Check the analytics engine logs for LLM-related errors

#### Frontend Issues
- Check browser console for JavaScript errors
- Verify the API response format matches the expected interface
- Check network tab for failed API calls

### Expected API Response Format
```json
{
  "success": true,
  "data": {
    "suitability_score": 40,
    "confidence_rating": "High Confidence",
    "weather_conditions": {
      "temperature": {
        "average": 16.19,
        "min": 13.42,
        "max": 18.93
      },
      "precipitation": {
        "average": 0,
        "max": 91.58,
        "probability_of_rain": 45.48
      },
      "wind": {
        "average_speed": 19.33,
        "max_speed": 68.72
      },
      "humidity": {
        "average": 77.07
      }
    },
    "recommendations": [
      "Dress in layers to adapt to the mild but potentially cool temperatures.",
      "Consider a sheltered location or alternative plans due to high rain potential."
    ],
    "risk_factors": [
      "High probability of rain (45.48%) could disrupt outdoor plans.",
      "Strong winds, potentially gusting up to 68.72 km/h, may make setting up difficult and uncomfortable."
    ]
  }
}
```
