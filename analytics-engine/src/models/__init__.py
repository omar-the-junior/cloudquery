"""
Data models for request/response validation.

This package contains Pydantic models for API request and response validation.
"""

from .weather_models import WeatherAnalysisRequest, WeatherAnalysisResponse

__all__ = [
    "WeatherAnalysisRequest",
    "WeatherAnalysisResponse"
]
