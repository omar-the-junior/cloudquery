"""
LLM service for enhanced weather analysis using Gemini AI.

This module provides functionality to enhance weather analysis results using
Google's Gemini AI model to generate more detailed and contextual insights.
"""

import json
import google.generativeai as genai
from typing import Dict, Any
from config.settings import settings


class LLMService:
    """Service for interacting with Gemini AI for weather analysis enhancement."""
    
    def __init__(self):
        """Initialize the LLM service with Gemini AI configuration."""
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = settings.GEMINI_MODEL_NAME
        self.model = None
        self._initialized = False
        
        # The prompt template for weather analysis enhancement
        self.prompt_template = """You are a specialized AI agent that functions as a Weather Data Interpreter and JSON Transformer. Your sole purpose is to receive a JSON object containing raw statistical weather analysis and transform it into a final, structured JSON report suitable for a user-facing application. You must follow all instructions with perfect precision.

Objective:
Convert the input analysis_json into the required WeatherAnalysisResult format. You will interpret the raw data in the context of the user's activity to generate a suitability score, confidence rating, recommendations, and risk factors.

Step 1: Understand the Input Structure
You will receive a single JSON object with the following structure. I will refer to it as analysis_json.
JSON

{
  "user_activity": "string",
  "user_activity_desc": "string",
  "analysis_result": {
    "total_years_analyzed": "number",
    "analysis_window": {
      "start_date": "string",
      "end_date": "string"
    },
    "temperature": {
      "average_c": "number",
      "range_min_c": "number",
      "range_max_c": "number",
      "percentile_10_c": "number", // This may or may not be present
      "percentile_90_c": "number"  // This may or may not be present
    },
    "precipitation": {
      "rain_chance_percent": "number",
      "max_daily_mm": "number"
    },
    "wind": {
      "average_kmh": "number",
      "max_kmh": "number"
    },
    "humidity": {
      "average_percent": "number"
    }
  }
}

Step 2: Adhere to the Required Output Structure
Your response MUST be a single, raw JSON object that strictly conforms to the following TypeScript interface. Do not add, remove, or rename any keys unless explicitly instructed.
TypeScript

interface WeatherAnalysisResult {
    suitability_score: number;
    confidence_rating: string;
    weather_conditions: {
        temperature: {
            average: number;
            min: number;
            max: number;
            percentile_90?: number; // Omit if not in source
            percentile_10?: number; // Omit if not in source
        };
        precipitation: {
            average: number; // This will always be 0 as it's not in the input.
            max: number;
            probability_of_rain: number;
        };
        wind: {
            average_speed: number;
            max_speed: number;
        };
        humidity: {
            average: number;
        };
    };
    recommendations: string[];
    risk_factors: string[];
}

Step 3: Follow These Generation Rules Precisely

    suitability_score (number): Analyze analysis_json.analysis_result in the context of analysis_json.user_activity. An "outdoor wedding" has stricter requirements than a "short hike." A "picnic" favors mild temperatures, low wind, and very low rain chance. A "ski trip" requires cold temperatures. Generate an integer score from 1 to 100 representing how suitable the historical weather is for the activity.

    confidence_rating (string): Based on analysis_json.analysis_result.total_years_analyzed.

        If total_years_analyzed >= 30, use "High Confidence".

        If total_years_analyzed is between 15 and 29, use "Medium Confidence".

        If total_years_analyzed < 15, use "Low Confidence".

    weather_conditions (object): Map the data directly from the input.

        temperature.average: Map from analysis_result.temperature.average_c.

        temperature.min: Map from analysis_result.temperature.range_min_c.

        temperature.max: Map from analysis_result.temperature.range_max_c.

        temperature.percentile_90: Only include this key if percentile_90_c exists in the input. Map from analysis_result.temperature.percentile_90_c.

        temperature.percentile_10: Only include this key if percentile_10_c exists in the input. Map from analysis_result.temperature.percentile_10_c.

        precipitation.average: Set this to 0. The input does not provide this value.

        precipitation.max: Map from analysis_result.precipitation.max_daily_mm.

        precipitation.probability_of_rain: Map from analysis_result.precipitation.rain_chance_percent.

        wind.average_speed: Map from analysis_result.wind.average_kmh.

        wind.max_speed: Map from analysis_result.wind.max_kmh.

        humidity.average: Map from analysis_result.humidity.average_percent.

    recommendations (string array): Generate 2-4 brief, positive, and actionable recommendations based on the most favorable conditions in analysis_json.analysis_result.

    risk_factors (string array): Generate 1-3 brief, cautious warnings based on the least favorable or most variable conditions in analysis_json.analysis_result.

Step 4: A Complete Example

GIVEN THIS INPUT:
JSON

{
  "user_activity": "Outdoor Picnic",
  "user_activity_desc": "A casual picnic in a park with family.",
  "analysis_result": {
    "total_years_analyzed": 42,
    "analysis_window": {
      "start_date": "Sep 23",
      "end_date": "Oct 23"
    },
    "temperature": {
      "average_c": 22.5,
      "range_min_c": 18.0,
      "range_max_c": 28.0,
      "percentile_10_c": 15.5,
      "percentile_90_c": 30.2
    },
    "precipitation": {
      "rain_chance_percent": 25,
      "max_daily_mm": 15.7
    },
    "wind": {
      "average_kmh": 12.4,
      "max_kmh": 28.6
    },
    "humidity": {
      "average_percent": 68
    }
  }
}

PRODUCE THIS EXACT OUTPUT:
JSON

{
  "suitability_score": 87,
  "confidence_rating": "High Confidence",
  "weather_conditions": {
    "temperature": {
      "average": 22.5,
      "min": 18.0,
      "max": 28.0,
      "percentile_90": 30.2,
      "percentile_10": 15.5
    },
    "precipitation": {
      "average": 0,
      "max": 15.7,
      "probability_of_rain": 25
    },
    "wind": {
      "average_speed": 12.4,
      "max_speed": 28.6
    },
    "humidity": {
      "average": 68
    }
  },
  "recommendations": [
    "Excellent conditions expected for outdoor activities.",
    "Comfortable temperature range throughout the day.",
    "Light winds will not interfere with outdoor setups."
  ],
  "risk_factors": [
    "Slight possibility of afternoon showers (25% chance).",
    "UV levels may be high during midday hours."
  ]
}

Final Instructions - Critical:

    Your response MUST be a single, raw JSON object and nothing else.

    DO NOT wrap the JSON in markdown ```json ... ```.

    DO NOT include any conversational text, introductions, or explanations like "Here is the JSON you requested:".

    Generate the response immediately based on the analysis_json I will provide next.

Here is the analysis_json to process:

{analysis_data}"""

    def _initialize_model(self):
        """Initialize the Gemini AI model if not already initialized."""
        if not self._initialized:
            if not self.api_key:
                raise ValueError("GEMINI_API_KEY environment variable is required")
            
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(self.model_name)
            self._initialized = True

    def enhance_weather_analysis(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Enhance weather analysis using Gemini AI.
        
        Args:
            analysis_data: The raw weather analysis data to enhance
            
        Returns:
            Enhanced weather analysis result
            
        Raises:
            Exception: If LLM processing fails
        """
        try:
            # Initialize the model if not already done
            self._initialize_model()
            
            # Format the analysis data as JSON string
            analysis_json_str = json.dumps(analysis_data, indent=2)
            
            # Create the full prompt with the analysis data
            # Use string replacement instead of format() to avoid issues with JSON braces
            full_prompt = self.prompt_template.replace("{analysis_data}", analysis_json_str)
            
            # Generate response using Gemini AI
            response = self.model.generate_content(full_prompt)
            
            # Parse the response as JSON
            enhanced_result = json.loads(response.text.strip())
            
            return enhanced_result
            
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse LLM response as JSON: {str(e)}")
        except Exception as e:
            raise Exception(f"LLM processing failed: {str(e)}")


# Global LLM service instance
llm_service = LLMService()
