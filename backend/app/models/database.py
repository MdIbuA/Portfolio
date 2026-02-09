"""
SQLAlchemy database models.
Simple schema: only store chat history for analytics and debugging.
Resume data lives in JSON file (single source of truth, easy to update).
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()


class ChatHistory(Base):
    """
    Stores chat interactions for:
    - Analytics (what questions are users asking?)
    - Debugging (is the AI answering correctly?)
    - Future improvements (fine-tuning prompts)
    - Session tracking (conversation flows)
    """
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, nullable=True, index=True)  # Track conversation sessions
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<ChatHistory(id={self.id}, session={self.session_id}, timestamp={self.timestamp})>"


# Database setup
def get_engine(database_url: str):
    """Create database engine."""
    return create_engine(
        database_url,
        connect_args={"check_same_thread": False} if "sqlite" in database_url else {}
    )


def get_session_local(engine):
    """Create session factory."""
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db(engine):
    """Initialize database tables."""
    Base.metadata.create_all(bind=engine)
