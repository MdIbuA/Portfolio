"""
API routes - thin layer that handles HTTP concerns.
Delegates business logic to services.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.schemas import ChatRequest, ChatResponse, ErrorResponse
from app.services.ai_service import AIService
from app.services.chat_service import ChatService
from app.repositories.chat_repository import ChatRepository
from app.config import get_settings


router = APIRouter(prefix="/api", tags=["chat"])


# Dependency injection
def get_db():
    """Database session dependency."""
    from app.models.database import get_session_local, get_engine
    settings = get_settings()
    engine = get_engine(settings.database_url)
    SessionLocal = get_session_local(engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_chat_service(db: Session = Depends(get_db)) -> ChatService:
    """Create ChatService with dependencies."""
    settings = get_settings()
    ai_service = AIService(settings)
    chat_repository = ChatRepository(db)
    return ChatService(ai_service, chat_repository)


@router.post(
    "/chat",
    response_model=ChatResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Invalid request"},
        503: {"model": ErrorResponse, "description": "AI service unavailable"},
        500: {"model": ErrorResponse, "description": "Server error"},
    },
    summary="Chat with Ibu about Mohamed's resume",
    description="Send a question and receive an AI-generated answer from Ibu, Mohamed's professional assistant. All responses are grounded in resume data."
)
async def chat(
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service)
) -> ChatResponse:
    """
    Chat endpoint - the main API interface.
    
    DESIGN PRINCIPLE: Backend owns AI behavior. Frontend only sends questions.
    
    Clean separation:
    - Validation: handled by Pydantic (ChatRequest)
    - Business logic: delegated to ChatService
    - AI persona: defined in backend (Ibu)
    - Error handling: converted to HTTP responses
    
    Frontend should NEVER contain AI logic or prompts.
    """
    try:
        response = await chat_service.handle_question(
            question=request.question,
            session_id=request.session_id
        )
        return response
    
    except ValueError as e:
        # User-friendly errors from AI service (rate limits, etc.)
        raise HTTPException(
            status_code=503,  # Service Unavailable
            detail=str(e)
        )
    
    except Exception as e:
        # Unexpected errors - log and return generic message
        print(f"Unexpected error processing chat request: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )


@router.get("/health", summary="Health check")
async def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy"}
