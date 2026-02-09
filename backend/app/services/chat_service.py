"""
Business logic layer - orchestrates AI service and data persistence.
This is where the core application logic lives.

DESIGN: Backend owns AI persona ("Ibu"). Frontend just displays messages.
"""
from app.services.ai_service import AIService
from app.repositories.chat_repository import ChatRepository
from app.models.schemas import ChatResponse
from typing import Optional


class ChatService:
    """
    Orchestrates the chat flow:
    1. Get AI answer from AIService (Ibu responds)
    2. Persist to database via ChatRepository
    3. Return response with assistant name
    
    Keeps API layer thin and testable.
    """
    
    def __init__(self, ai_service: AIService, chat_repository: ChatRepository):
        self.ai_service = ai_service
        self.chat_repository = chat_repository
    
    async def handle_question(self, question: str, session_id: Optional[str] = None) -> ChatResponse:
        """
        Process a user question end-to-end.
        
        Args:
            question: User's question about the resume
            session_id: Optional session identifier for tracking conversations
            
        Returns:
            ChatResponse with Ibu's answer and timestamp
            
        Raises:
            ValueError: If AI service fails with user-friendly message
        """
        # Get AI answer from Ibu (may raise ValueError with user-friendly message)
        answer = await self.ai_service.get_answer(question)
        
        # Persist to database (fire and forget - don't block response on DB write)
        # In production, you might use background tasks for this
        try:
            chat_record = self.chat_repository.save_chat(
                question=question,
                answer=answer,
                session_id=session_id
            )
            timestamp = chat_record.timestamp
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to save chat history: {e}")
            from datetime import datetime
            timestamp = datetime.utcnow()
        
        # Return response with Ibu as the assistant
        return ChatResponse(
            assistant="Ibu",
            answer=answer,
            timestamp=timestamp
        )
