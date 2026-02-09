"""
Configuration management for the portfolio backend.
Centralizes environment variables and app settings.
"""
import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Configuration
    app_name: str = "Portfolio AI Chat API"
    debug: bool = False
    
    # OpenRouter API
    openrouter_api_key: str
    openrouter_model: str = "meta-llama/llama-3.2-3b-instruct:free"
    
    # Database
    database_url: str = "sqlite:///./portfolio.db"
    
    # CORS
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Return cached settings instance."""
    return Settings()
