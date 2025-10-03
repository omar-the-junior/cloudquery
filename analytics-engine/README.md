# CloudQuery Weather Analytics Engine

A FastAPI-based service for analyzing historical weather data using NASA POWER API.

## Overview

This service provides REST API endpoints for weather analysis by fetching 40+ years of historical weather data from NASA POWER API and analyzing it for specific locations and dates.

## Features

- **Historical Data Analysis**: Analyzes 40+ years of weather data
- **31-Day Window Analysis**: Provides analysis for a 31-day window around target dates
- **Multiple Weather Parameters**: Temperature, precipitation, wind, humidity
- **REST API**: Easy-to-use HTTP endpoints
- **Data Validation**: Input validation using Pydantic models

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Running the API Server

```bash
python run.py
```

The API will be available at `http://localhost:8000`

### API Documentation

- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

### Example API Call

```bash
curl -X POST "http://localhost:8000/analyze" \
     -H "Content-Type: application/json" \
     -d '{
       "latitude": 40.7128,
       "longitude": -74.0060,
       "target_date": "2025-10-08"
     }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "total_years_analyzed": 40,
    "analysis_window": {
      "start_date": "Sep 23",
      "end_date": "Oct 23"
    },
    "temperature": {
      "average_c": 15.2,
      "range_min_c": 8.5,
      "range_max_c": 22.1
    },
    "precipitation": {
      "rain_chance_percent": 25.5,
      "max_daily_mm": 45.2
    },
    "wind": {
      "average_kmh": 12.3,
      "max_kmh": 28.7
    },
    "humidity": {
      "average_percent": 68.4
    }
  }
}
```

## API Endpoints

### POST /analyze

Analyze historical weather data for a specific location and date.

**Request Body:**
- `latitude` (float): Latitude (-90 to 90)
- `longitude` (float): Longitude (-180 to 180)  
- `target_date` (string): Target date in YYYY-MM-DD format

**Response:**
- `success` (boolean): Whether the analysis was successful
- `data` (object): Weather analysis results (if successful)
- `error` (string): Error message (if failed)

### GET /health

Health check endpoint.

### GET /

Root endpoint with API information.

## Project Structure

```
analytics-engine/
├── src/
│   ├── core/           # Core analytics modules
│   │   ├── data_fetcher.py
│   │   ├── data_harmonizer.py
│   │   ├── weather_analyzer.py
│   │   └── weather_service.py
│   ├── api/            # FastAPI application
│   │   └── main.py
│   └── models/         # Pydantic models
│       └── weather_models.py
├── config/             # Configuration settings
│   └── settings.py
├── tests/              # Test files
├── run.py             # Main entry point
├── requirements.txt   # Dependencies
└── README.md         # Documentation
```

### Module Structure

- **`src/core/`**: Core analytics functionality
  - `data_fetcher.py`: Handles fetching data from NASA POWER API
  - `data_harmonizer.py`: Cleans and standardizes the raw data
  - `weather_analyzer.py`: Performs statistical analysis on the data
  - `weather_service.py`: Orchestrates the complete analysis pipeline
- **`src/api/`**: FastAPI application with REST endpoints
- **`src/models/`**: Pydantic models for request/response validation
- **`config/`**: Configuration settings and environment variables

## Data Sources

This service uses the NASA POWER API (https://power.larc.nasa.gov/) which provides:
- 40+ years of historical weather data
- Daily resolution data
- Global coverage
- Multiple weather parameters (temperature, precipitation, wind, humidity)

## Error Handling

The API includes comprehensive error handling for:
- Invalid coordinates
- Invalid date formats
- API request failures
- Data processing errors
