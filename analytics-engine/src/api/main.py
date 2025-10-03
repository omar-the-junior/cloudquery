"""
FastAPI application for CloudQuery Weather Analytics Engine.

This module provides REST API endpoints for weather analysis using historical data
from the NASA POWER API.
"""

from fastapi import FastAPI, HTTPException
from typing import Dict, Any
import uvicorn
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from ..core.weather_service import get_weather_analysis
from ..models.weather_models import WeatherAnalysisRequest, WeatherAnalysisResponse
from config.settings import settings


# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION
)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": settings.API_TITLE,
        "version": settings.API_VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "weather-analytics"}


@app.post("/analyze", response_model=WeatherAnalysisResponse)
async def analyze_weather(request: WeatherAnalysisRequest):
    """
    Analyze historical weather data for a specific location and date.
    
    This endpoint fetches 40+ years of historical weather data from NASA POWER API
    and analyzes it for a 31-day window around the target date.
    """
    try:
        # Validate date format
        from datetime import datetime
        try:
            datetime.strptime(request.target_date, '%Y-%m-%d')
        except ValueError:
            raise HTTPException(
                status_code=400, 
                detail="Invalid date format. Use YYYY-MM-DD format."
            )
        
        # Perform weather analysis
        result = get_weather_analysis(
            latitude=request.latitude,
            longitude=request.longitude,
            target_date_str=request.target_date
        )
        
        # Check if analysis returned an error
        if "error" in result:
            return WeatherAnalysisResponse(
                success=False,
                error=result["error"]
            )
        
        return WeatherAnalysisResponse(
            success=True,
            data=result
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
