"""
Data harmonization module for weather data processing.

This module handles cleaning and standardizing weather data from the NASA POWER API
into a consistent format for analysis.
"""

import pandas as pd
from typing import Optional


def harmonize_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Harmonizes the historical weather data DataFrame by renaming columns,
    creating a date column, and reordering columns.

    Args:
        df: The original pandas DataFrame containing historical weather data.
        
    Returns:
        A harmonized pandas DataFrame.
    """
    print("Harmonizing the data...")

    # Rename columns for clarity
    df = df.rename(columns={
        "T2M": "Avg_Temperature_C",
        "T2M_MAX": "Max_Temperature_C",
        "T2M_MIN": "Min_Temperature_C",
        "PRECTOTCORR": "Precipitation_mm",
        "RH2M": "Humidity_Percent",
        "WS10M": "Wind_Speed_m/s",
        "WS10M_MAX": "Max_Wind_Speed_m/s"
    })

    # Rename columns to lowercase for to_datetime compatibility
    df = df.rename(columns={'YEAR': 'year', 'MO': 'month', 'DY': 'day'})
    # Create a 'Date' column from 'year', 'month', 'day'
    df['Date'] = pd.to_datetime(df[['year', 'month', 'day']])

    # Drop the original 'YEAR', 'MO', 'DY' columns
    df = df.drop(columns=['year', 'month', 'day'])

    # Reorder columns to have 'Date' first
    cols = ['Date'] + [col for col in df.columns if col != 'Date']
    df = df[cols]
    print("Data harmonization complete.")
    return df
