"""
FastAPI application entry point.
Configures middleware, routes, and database initialization.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.models.database import get_engine, init_db
from app.api.routes import router


def create_app() -> FastAPI:
    """
    Application factory pattern.
    Makes testing easier and configuration more explicit.
    """
    settings = get_settings()
    
    app = FastAPI(
        title=settings.app_name,
        description="AI-powered chat interface for portfolio resume queries",
        version="1.0.0",
        docs_url="/docs",  # Swagger UI
        redoc_url="/redoc",  # ReDoc
    )
    
    # CORS middleware - allow frontend to call API
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Initialize database
    engine = get_engine(settings.database_url)
    init_db(engine)
    
    # Register routes
    app.include_router(router)
    
    return app


# Create app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn
    import os
    settings = get_settings()
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=settings.debug
    )
