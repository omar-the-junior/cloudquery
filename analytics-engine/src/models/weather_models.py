"""
Pydantic models for weather analysis API.

This module defines the request and response models for the weather analysis API.
"""

from pydantic import BaseModel, Field
from typing import Dict, Any


class WeatherAnalysisRequest(BaseModel):
    """Request model for weather analysis."""
    latitude: float = Field(..., ge=-90, le=90, description="Latitude (-90 to 90)")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude (-180 to 180)")
    target_date: str = Field(..., description="Target date in YYYY-MM-DD format")

    class Config:
        json_schema_extra = {
            "example": {
                "latitude": 40.7128,
                "longitude": -74.0060,
                "target_date": "2025-10-08"
            }
        }


class WeatherAnalysisResponse(BaseModel):
    """Response model for weather analysis."""
    success: bool
    data: Dict[str, Any] = None
    error: str = None
