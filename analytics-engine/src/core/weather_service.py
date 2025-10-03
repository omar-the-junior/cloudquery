"""
Main weather service module that orchestrates the complete weather analysis pipeline.

This module combines data fetching, harmonization, and analysis into a single service
that can be used by FastAPI endpoints.
"""

from typing import Dict, Any
from .data_fetcher import fetch_historical_data
from .data_harmonizer import harmonize_data
from .weather_analyzer import analyze_historical_data


def get_weather_analysis(latitude: float, longitude: float, target_date_str: str) -> Dict[str, Any]:
    """
    Orchestrates the fetching, harmonization, and analysis of weather data.
    
    Args:
        latitude: The latitude of the location (-90 to 90).
        longitude: The longitude of the location (-180 to 180).
        target_date_str: The user's target future date (e.g., "2025-10-08").
        
    Returns:
        A dictionary containing the complete weather analysis results.
    """
    print("--- Starting CloudQuery Phase 1 Analytical Engine ---")
    
    # Step 1: Fetch raw data from NASA POWER API
    raw_data = fetch_historical_data(latitude, longitude)
    if raw_data.empty:
        return {"error": "Failed to fetch data from NASA POWER."}
    
    # Step 2: Harmonize the data
    harmonized_data = harmonize_data(raw_data)
    
    # Step 3: Perform analysis
    final_analysis = analyze_historical_data(harmonized_data, target_date_str)
    
    print("--- Analytical Engine Finished ---")
    
    return final_analysis
