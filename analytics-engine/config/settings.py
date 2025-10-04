"""
Configuration settings for the CloudQuery Analytics Engine.

This module contains all configuration settings for the application.
"""

import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings."""
    
    # API Configuration
    API_TITLE: str = "CloudQuery Weather Analytics API"
    API_DESCRIPTION: str = "Historical weather analysis using NASA POWER API data"
    API_VERSION: str = "1.0.0"
    
    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8001"))
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # NASA POWER API Configuration
    NASA_POWER_BASE_URL: str = "https://power.larc.nasa.gov/api/temporal/daily/point"
    NASA_POWER_TIMEOUT: int = 30
    NASA_POWER_PARAMETERS: str = "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,RH2M,WS10M,WS10M_MAX"
    NASA_POWER_COMMUNITY: str = "RE"
    NASA_POWER_START_DATE: str = "19840101"
    NASA_POWER_END_DATE: str = "20241231"
    NASA_POWER_FORMAT: str = "CSV"
    
    # Analysis Configuration
    ANALYSIS_WINDOW_DAYS: int = 31
    ANALYSIS_WINDOW_HALF: int = 15
    PRECIPITATION_THRESHOLD_MM: float = 0.2
    WIND_SPEED_CONVERSION_FACTOR: float = 3.6  # m/s to km/h
    
    # Data Processing Configuration
    MISSING_VALUE_INDICATOR: int = -999
    DECIMAL_PLACES: int = 2
    
    # Gemini AI Configuration
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL_NAME: str = "gemini-2.5-flash"


# Global settings instance
settings = Settings()
