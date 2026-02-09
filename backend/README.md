# Portfolio AI Chat Backend

A production-ready FastAPI backend that powers AI-driven resume Q&A for the portfolio website.

## 🏗️ Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI app + CORS setup
│   ├── config.py            # Settings management
│   ├── models/
│   │   ├── schemas.py       # Pydantic request/response models
│   │   └── database.py      # SQLAlchemy models
│   ├── services/
│   │   ├── ai_service.py    # OpenRouter API integration
│   │   └── chat_service.py  # Business logic orchestration
│   ├── repositories/
│   │   └── chat_repository.py  # Data persistence layer
│   └── api/
│       └── routes.py        # API endpoints
└── data/
    └── resume.json          # Structured resume data
```

## 🎯 Design Decisions

### 1. **Layered Architecture**
- **API Layer** (`routes.py`): Thin controllers, handle HTTP concerns
- **Service Layer** (`chat_service.py`): Business logic orchestration
- **AI Layer** (`ai_service.py`): OpenRouter API communication
- **Repository Layer** (`chat_repository.py`): Database operations

**Why?** Clean separation of concerns. Easy to test, modify, and scale each layer independently.

### 2. **Resume as JSON, Not Database**
Resume data lives in `data/resume.json`, not the database.

**Why?**
- Single source of truth
- Easy to update without migrations
- Small data size (< 5KB) - no performance penalty
- Version controllable

### 3. **Minimal Database Schema**
Only one table: `chat_history` (question, answer, timestamp)

**Why?**
- No premature optimization
- Useful for analytics ("what are users asking?")
- Helps debug AI responses
- No unnecessary complexity

### 4. **Prompt Engineering Strategy**
- Embed full resume in system prompt
- Explicit "no hallucination" instructions
- Low temperature (0.3) for factual answers
- First-person responses for natural feel

**Why not RAG?**
- Resume is small (< 5KB)
- No need for vector DB overhead
- Simpler = fewer failure points
- Faster responses

### 5. **Error Handling Philosophy**
- DB write failures don't block user responses
- Graceful degradation
- Proper HTTP status codes
- User-friendly error messages

## 🚀 Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your OpenRouter API key
```

### 3. Run Server
```bash
# Development
python -m app.main

# Or with uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Test API
```bash
# Health check
curl http://localhost:8000/api/health

# Chat endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What technologies does Mohamed know?"}'
```

## 📡 API Endpoints

### `POST /api/chat`
Ask a question about the resume.

**Request:**
```json
{
  "question": "What is Mohamed's experience with AI?"
}
```

**Response:**
```json
{
  "answer": "I have hands-on experience with AI/ML through my internship at Infosys Springboard...",
  "timestamp": "2026-02-08T19:20:00Z"
}
```

### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

## 📚 API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

```bash
# Test with curl
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about your projects"}'

# Test with httpie (if installed)
http POST localhost:8000/api/chat question="What skills do you have?"
```

## 🔧 Configuration

All configuration in `.env`:

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free
DATABASE_URL=sqlite:///./portfolio.db
DEBUG=True
CORS_ORIGINS=["http://localhost:5173"]
```

## 📊 Database

SQLite by default. To use PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost/portfolio
```

## 🚢 Deployment

### Option 1: Railway / Render
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Option 2: Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🎓 What This Demonstrates

✅ **Clean Architecture** - Proper layer separation  
✅ **Dependency Injection** - FastAPI's DI system  
✅ **Type Safety** - Pydantic models everywhere  
✅ **Error Handling** - Graceful failures  
✅ **API Design** - RESTful, documented endpoints  
✅ **AI Integration** - Proper prompt engineering  
✅ **Database Design** - Intentional, minimal schema  
✅ **Configuration Management** - Environment-based settings  
✅ **Code Quality** - Readable, maintainable, idiomatic Python  

## 📝 Trade-offs

| Decision | Pro | Con | Verdict |
|----------|-----|-----|---------|
| JSON resume | Easy updates, version control | Not queryable | ✅ Right choice (small data) |
| Embed resume in prompt | Simple, fast | Token usage | ✅ Right choice (< 5KB) |
| SQLite default | Zero config | Not for high traffic | ✅ Right for portfolio |
| No auth | Simpler | Public API | ✅ Right (read-only data) |

## 🔒 Security Notes

- API key in `.env` (never commit)
- CORS configured for specific origins
- Input validation via Pydantic
- SQL injection prevented by SQLAlchemy ORM
- Rate limiting recommended for production

## 📈 Future Enhancements (if needed)

- [ ] Rate limiting (e.g., slowapi)
- [ ] Caching (e.g., Redis for repeated questions)
- [ ] Analytics dashboard (visualize chat_history)
- [ ] Streaming responses (SSE)
- [ ] Multi-language support

---

**Built with:** FastAPI, SQLAlchemy, OpenRouter, Pydantic  
**Philosophy:** Clarity > Cleverness, Simplicity > Sophistication
