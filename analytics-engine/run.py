"""
Main entry point for the CloudQuery Weather Analytics Engine.

This script provides an easy way to run the FastAPI application.
"""

import uvicorn
from config.settings import settings

if __name__ == "__main__":
    uvicorn.run(
        "src.api.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
