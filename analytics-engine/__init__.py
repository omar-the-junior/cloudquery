"""
CloudQuery Analytics Engine

A Python package for analyzing historical weather data using NASA POWER API.
"""

from src.core.weather_service import get_weather_analysis
from src.core.data_fetcher import fetch_historical_data
from src.core.data_harmonizer import harmonize_data
from src.core.weather_analyzer import analyze_historical_data

__version__ = "1.0.0"
__author__ = "CloudQuery Team"

__all__ = [
    "get_weather_analysis",
    "fetch_historical_data", 
    "harmonize_data",
    "analyze_historical_data"
]
