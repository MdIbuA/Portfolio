"""
Pydantic schemas for request/response validation.
These define the API contract between frontend and backend.

DESIGN: Backend owns AI behavior. Frontend only sends questions and displays responses.
"""
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    question: str = Field(..., min_length=1, max_length=500, description="User's question about the resume")
    session_id: Optional[str] = Field(None, description="Optional session ID for conversation tracking")
    
    class Config:
        json_schema_extra = {
            "example": {
                "question": "What technologies does Mohamed know?",
                "session_id": "user-123-session"
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    assistant: str = Field(default="Ibu", description="AI assistant name - always 'Ibu'")
    answer: str = Field(..., description="AI-generated answer grounded in resume data")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "assistant": "Ibu",
                "answer": "Mohamed is proficient in HTML5, CSS3, JavaScript, TypeScript, React, Node.js, MongoDB, Express.js, Python, Java, Docker, and cloud platforms like Google Cloud and AWS.",
                "timestamp": "2026-02-08T19:20:00Z"
            }
        }


class ErrorResponse(BaseModel):
    """Standard error response."""
    error: str
    detail: str | None = None
