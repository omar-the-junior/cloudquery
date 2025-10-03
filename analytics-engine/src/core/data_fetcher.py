"""
Data fetching module for NASA POWER API integration.

This module handles fetching historical weather data from the NASA POWER API
for specific geographical coordinates.
"""

import requests
import pandas as pd
import io
from typing import Optional
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))
from config.settings import settings


def fetch_historical_data(latitude: float, longitude: float) -> pd.DataFrame:
    """
    Fetches 40+ years of daily historical weather data from the NASA POWER API
    for a specific location.

    Args:
        latitude: The latitude of the location (-90 to 90).
        longitude: The longitude of the location (-180 to 180).

    Returns:
        A pandas DataFrame containing the cleaned, daily historical weather data,
        or an empty DataFrame if the request fails.
    """
    print("Fetching historical data from NASA POWER API...")

    # Define the API endpoint and parameters
    base_url = settings.NASA_POWER_BASE_URL
    params = {
        "parameters": settings.NASA_POWER_PARAMETERS,
        "community": settings.NASA_POWER_COMMUNITY,
        "latitude": str(latitude),
        "longitude": str(longitude),
        "start": settings.NASA_POWER_START_DATE,
        "end": settings.NASA_POWER_END_DATE,
        "format": settings.NASA_POWER_FORMAT
    }

    try:
        # Make the API request
        response = requests.get(base_url, params=params, timeout=settings.NASA_POWER_TIMEOUT)
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

        # --- Data Cleaning ---
        # The API response includes a header section we need to remove.
        # The pure CSV data starts with the line containing the column headers.
        raw_text = response.text
        lines = raw_text.split('\n')

        # Find the starting line of the CSV data
        csv_start_index = -1
        for i, line in enumerate(lines):
            if line.strip().startswith("YEAR,MO,DY"):
                csv_start_index = i
                break
        
        if csv_start_index == -1:
            print("Error: Could not find CSV header in API response.")
            return pd.DataFrame()

        # Reconstruct the clean CSV string
        clean_csv_str = "\n".join(lines[csv_start_index:])

        # Read the clean CSV string into a pandas DataFrame
        # The API uses -999 for missing values.
        df = pd.read_csv(io.StringIO(clean_csv_str), na_values=[settings.MISSING_VALUE_INDICATOR])
        
        print("Successfully fetched and cleaned data.")
        return df

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
        return pd.DataFrame()
