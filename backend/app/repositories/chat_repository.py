"""
Data persistence layer - handles database operations.
Follows repository pattern for clean separation of concerns.
"""
from sqlalchemy.orm import Session
from app.models.database import ChatHistory
from typing import Optional


class ChatRepository:
    """
    Encapsulates all database operations for chat history.
    Makes it easy to swap databases or add caching later.
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    def save_chat(self, question: str, answer: str, session_id: Optional[str] = None) -> ChatHistory:
        """
        Persist a chat interaction to the database.
        
        Args:
            question: User's question
            answer: AI's response
            session_id: Optional session identifier for tracking conversations
            
        Returns:
            Created ChatHistory record
        """
        chat = ChatHistory(
            question=question,
            answer=answer,
            session_id=session_id
        )
        self.db.add(chat)
        self.db.commit()
        self.db.refresh(chat)
        return chat
    
    def get_recent_chats(self, limit: int = 10) -> list[ChatHistory]:
        """
        Retrieve recent chat history (useful for analytics dashboard later).
        
        Args:
            limit: Maximum number of records to return
            
        Returns:
            List of recent ChatHistory records
        """
        return (
            self.db.query(ChatHistory)
            .order_by(ChatHistory.timestamp.desc())
            .limit(limit)
            .all()
        )
    
    def get_session_history(self, session_id: str, limit: int = 20) -> list[ChatHistory]:
        """
        Retrieve chat history for a specific session.
        
        Args:
            session_id: Session identifier
            limit: Maximum number of records to return
            
        Returns:
            List of ChatHistory records for the session
        """
        return (
            self.db.query(ChatHistory)
            .filter(ChatHistory.session_id == session_id)
            .order_by(ChatHistory.timestamp.asc())
            .limit(limit)
            .all()
        )
