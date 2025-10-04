"""
FastAPI application for CloudQuery Weather Analytics Engine.

This module provides REST API endpoints for weather analysis using historical data
from the NASA POWER API.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
import uvicorn
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from ..core.weather_service import get_weather_analysis
from ..core.llm_service import llm_service
from ..models.weather_models import WeatherAnalysisRequest, WeatherAnalysisResponse
from config.settings import settings


# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
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
    and analyzes it for a 31-day window around the target date. The results are then
    enhanced using Gemini AI to provide contextual insights based on the user's activity.
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
        
        # Prepare data for LLM enhancement
        analysis_data = {
            "user_activity": request.user_activity,
            "user_activity_desc": request.user_activity_desc,
            "analysis_result": result
        }
        
        # Enhance the analysis using Gemini AI
        try:
            enhanced_result = llm_service.enhance_weather_analysis(analysis_data)
            return WeatherAnalysisResponse(
                success=True,
                data=enhanced_result
            )
        except Exception as llm_error:
            # If LLM enhancement fails, return the original analysis with a warning
            return WeatherAnalysisResponse(
                success=True,
                data={
                    "raw_analysis": result,
                    "enhancement_error": f"LLM enhancement failed: {str(llm_error)}",
                    "user_activity": request.user_activity,
                    "user_activity_desc": request.user_activity_desc
                }
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
