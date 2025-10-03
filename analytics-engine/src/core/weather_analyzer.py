"""
Weather analysis module for historical data processing.

This module performs statistical analysis on harmonized weather data
for specific date windows and locations.
"""

import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, Any
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))
from config.settings import settings


def analyze_historical_data(harmonized_df: pd.DataFrame, target_date_str: str) -> Dict[str, Any]:
    """
    Analyzes a harmonized historical weather DataFrame for a 31-day window.

    Args:
        harmonized_df: DataFrame that has been processed by the harmonize_data function.
        target_date_str: The user's target future date (e.g., "2025-10-08").

    Returns:
        A dictionary containing the structured analytical results for the window.
    """
    if harmonized_df.empty:
        return {"error": "Input DataFrame is empty."}

    # --- 1. Define the 31-Day Date Window ---
    # The 'Date' column is already created in the harmonization step.
    
    target_date = datetime.strptime(target_date_str, '%Y-%m-%d')
    start_date = target_date - timedelta(days=settings.ANALYSIS_WINDOW_HALF)
    end_date = target_date + timedelta(days=settings.ANALYSIS_WINDOW_HALF)
    
    start_doy = start_date.timetuple().tm_yday
    end_doy = end_date.timetuple().tm_yday
    
    # --- 2. Filter Data for the Target Window ---
    # Create a "day of year" column from the existing 'Date' column.
    df_with_doy = harmonized_df.copy()
    df_with_doy['doy'] = df_with_doy['Date'].dt.dayofyear
    
    if start_doy > end_doy:  # Handles windows crossing the new year
        window_slice = df_with_doy[
            (df_with_doy['doy'] >= start_doy) | (df_with_doy['doy'] <= end_doy)
        ].copy()
    else:
        window_slice = df_with_doy[
            (df_with_doy['doy'] >= start_doy) & (df_with_doy['doy'] <= end_doy)
        ].copy()

    if window_slice.empty:
        return {"error": f"No historical data found for the window around {target_date_str}."}

    # --- 3. Perform Statistical Calculations (using new column names) ---
    days_with_rain = window_slice[window_slice['Precipitation_mm'] > settings.PRECIPITATION_THRESHOLD_MM].shape[0]
    total_days_in_slice = window_slice.shape[0]
    rain_chance = (days_with_rain / total_days_in_slice) * 100 if total_days_in_slice > 0 else 0

    # Convert m/s to km/h
    window_slice['Wind_Speed_kmh'] = window_slice['Wind_Speed_m/s'] * settings.WIND_SPEED_CONVERSION_FACTOR
    window_slice['Max_Wind_Speed_kmh'] = window_slice['Max_Wind_Speed_m/s'] * settings.WIND_SPEED_CONVERSION_FACTOR
    
    # Get the number of unique years from the 'Date' column
    total_years = window_slice['Date'].dt.year.nunique()

    # --- 4. Structure the Output JSON (using new column names) ---
    analysis_results = {
        "total_years_analyzed": total_years,
        "analysis_window": {
            "start_date": start_date.strftime('%b %d'),
            "end_date": end_date.strftime('%b %d')
        },
        "temperature": {
            "average_c": window_slice['Avg_Temperature_C'].mean(),
            "range_min_c": window_slice['Min_Temperature_C'].mean(),
            "range_max_c": window_slice['Max_Temperature_C'].mean()
        },
        "precipitation": {
            "rain_chance_percent": rain_chance,
            "max_daily_mm": window_slice['Precipitation_mm'].max()
        },
        "wind": {
            "average_kmh": window_slice['Wind_Speed_kmh'].mean(),
            "max_kmh": window_slice['Max_Wind_Speed_kmh'].max()
        },
        "humidity": {
            "average_percent": window_slice['Humidity_Percent'].mean()
        }
    }
    
    # Round all numeric values for a clean output
    for category, metrics in analysis_results.items():
        if isinstance(metrics, dict):
            for key, value in metrics.items():
                if isinstance(value, (int, float)):
                    metrics[key] = round(value, settings.DECIMAL_PLACES)

    return analysis_results
