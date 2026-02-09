# Portfolio AI Chat Backend - Architecture Documentation

## 📐 System Architecture

This backend demonstrates **production-ready engineering principles** through clean separation of concerns and intentional design decisions.

### Layer Breakdown

```
┌─────────────────────────────────────────────────────────┐
│                    API Layer (routes.py)                 │
│  • HTTP request/response handling                        │
│  • Input validation (Pydantic)                           │
│  • Error → HTTP status code mapping                      │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│              Service Layer (chat_service.py)             │
│  • Business logic orchestration                          │
│  • Coordinates AI + Database operations                  │
│  • Graceful error handling                               │
└────────┬───────────────────────────────┬────────────────┘
         │                               │
┌────────▼──────────────┐    ┌──────────▼───────────────┐
│  AI Service Layer      │    │  Repository Layer        │
│  (ai_service.py)       │    │  (chat_repository.py)    │
│  • OpenRouter API      │    │  • Database operations   │
│  • Prompt engineering  │    │  • Data persistence      │
│  • Response parsing    │    │  • Query abstraction     │
└────────┬──────────────┘    └──────────┬───────────────┘
         │                               │
┌────────▼──────────────┐    ┌──────────▼───────────────┐
│   OpenRouter API       │    │   SQLite Database        │
│   (External Service)   │    │   (chat_history table)   │
└────────────────────────┘    └──────────────────────────┘
```

## 🎯 Key Design Decisions

### 1. Why JSON Resume Instead of Database?

**Decision:** Store resume data in `data/resume.json`, not in the database.

**Rationale:**
- ✅ **Single source of truth** - Easy to update without migrations
- ✅ **Version control** - Changes tracked in git
- ✅ **Small data** - Resume is < 5KB, no performance penalty
- ✅ **Simplicity** - No schema migrations when adding fields
- ✅ **Portability** - Easy to export/import

**Trade-off:** Not queryable via SQL (but we don't need that)

### 2. Why Embed Resume in Prompt Instead of RAG?

**Decision:** Include full resume in system prompt, not vector database + RAG.

**Rationale:**
- ✅ **Data size** - Resume fits comfortably in context window (< 5KB)
- ✅ **Simplicity** - No vector DB, embeddings, or retrieval logic
- ✅ **Latency** - Single API call, no retrieval step
- ✅ **Accuracy** - Model sees all context, no retrieval errors
- ✅ **Cost** - Free tier model, token cost negligible

**When to use RAG instead:**
- ❌ Large document corpus (100+ pages)
- ❌ Frequently updated content
- ❌ Need to cite specific sources
- ❌ Multi-document queries

**For a portfolio resume:** Embedding in prompt is the right choice.

### 3. Why Minimal Database Schema?

**Decision:** Only one table: `chat_history` (question, answer, timestamp)

**Rationale:**
- ✅ **YAGNI principle** - Don't build what you don't need yet
- ✅ **Analytics** - Track what users ask
- ✅ **Debugging** - Review AI responses for quality
- ✅ **Future-proof** - Can add features later if needed

**What we DON'T store:**
- ❌ User accounts (no auth needed for public portfolio)
- ❌ Sessions (stateless API)
- ❌ Resume versions (git handles that)
- ❌ Feedback/ratings (can add later if needed)

### 4. Error Handling Philosophy

**Decision:** Graceful degradation with user-friendly messages.

**Implementation:**
```python
# AI Service Layer
if response.status_code == 429:
    raise ValueError("The AI service is currently rate-limited. Please try again in a moment.")

# API Layer
except ValueError as e:
    raise HTTPException(status_code=503, detail=str(e))  # User-friendly
except Exception as e:
    raise HTTPException(status_code=500, detail="An unexpected error occurred.")  # Generic
```

**Rationale:**
- ✅ **User experience** - Clear, actionable error messages
- ✅ **Security** - Don't leak implementation details
- ✅ **Debugging** - Log full errors server-side
- ✅ **Resilience** - DB failures don't break responses

### 5. Prompt Engineering Strategy

**System Prompt Design:**
```
1. Clear role definition
2. Explicit grounding rules
3. Embedded resume data
4. Anti-hallucination instructions
5. Professional tone guidance
```

**Temperature:** 0.3 (low for factual, consistent answers)
**Max tokens:** 300 (concise responses)
**Model:** Free tier Llama 3.2 3B (good balance of quality/cost)

## 🔧 Technology Choices

| Technology | Why? | Alternative Considered |
|------------|------|------------------------|
| **FastAPI** | Modern, async, auto-docs | Flask (too basic), Django (too heavy) |
| **SQLAlchemy** | ORM abstraction, portable | Raw SQL (less maintainable) |
| **Pydantic** | Type safety, validation | Manual validation (error-prone) |
| **SQLite** | Zero config, perfect for portfolio | PostgreSQL (overkill for this scale) |
| **httpx** | Async HTTP client | requests (sync only) |

## 📊 Database Schema

```sql
CREATE TABLE chat_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Why this schema?**
- Simple, focused, intentional
- Supports analytics queries like:
  - "What are the most common questions?"
  - "How is the AI performing over time?"
  - "What topics are users interested in?"

## 🚀 API Design

### POST /api/chat

**Request:**
```json
{
  "question": "What is Mohamed's experience with AI?"
}
```

**Success Response (200):**
```json
{
  "answer": "I have hands-on experience with AI/ML through...",
  "timestamp": "2026-02-08T19:20:00Z"
}
```

**Error Responses:**
- `400` - Invalid request (Pydantic validation)
- `503` - AI service unavailable (rate limit, timeout)
- `500` - Unexpected server error

**Design principles:**
- ✅ RESTful
- ✅ JSON request/response
- ✅ Proper HTTP status codes
- ✅ Auto-generated OpenAPI docs

## 🧪 Testing Strategy

**Unit Tests** (not implemented yet, but would test):
- Prompt construction logic
- Error handling paths
- Database operations

**Integration Tests:**
- `test_api.py` - Full request/response cycle
- `test_single.py` - Rate limit-friendly single test

**Manual Testing:**
- Swagger UI at `/docs`
- ReDoc at `/redoc`

## 🔒 Security Considerations

1. **API Key Protection**
   - Stored in `.env` (gitignored)
   - Never exposed to frontend
   - Server-side only

2. **Input Validation**
   - Pydantic models validate all inputs
   - Max question length: 500 chars
   - SQL injection prevented by ORM

3. **CORS**
   - Configured for specific origins
   - No wildcard `*` in production

4. **Rate Limiting**
   - Currently handled by OpenRouter
   - Could add application-level limits with `slowapi`

## 📈 Scalability Considerations

**Current design handles:**
- ✅ 100s of requests/day (portfolio traffic)
- ✅ SQLite (< 1000 concurrent users)
- ✅ Single server deployment

**When to scale:**
- 🔄 **1000+ requests/day** → Add Redis caching for common questions
- 🔄 **10,000+ requests/day** → Switch to PostgreSQL
- 🔄 **100,000+ requests/day** → Add load balancer, multiple servers

**Current architecture supports these upgrades** without major rewrites.

## 🎓 What This Demonstrates

### Backend Fundamentals
- ✅ Layered architecture (separation of concerns)
- ✅ Dependency injection (FastAPI's DI system)
- ✅ Error handling (graceful degradation)
- ✅ Configuration management (environment-based)

### Clean Code
- ✅ Type hints everywhere
- ✅ Docstrings for all public methods
- ✅ Meaningful variable names
- ✅ Comments explain "why", not "what"

### System Design
- ✅ Intentional technology choices
- ✅ Trade-off analysis
- ✅ Scalability awareness
- ✅ YAGNI principle (no premature optimization)

### AI Integration
- ✅ Proper prompt engineering
- ✅ Grounding strategies
- ✅ Error handling for external APIs
- ✅ Cost-conscious model selection

## 🔮 Future Enhancements

**If this were a real product:**

1. **Caching** - Redis for repeated questions
2. **Rate Limiting** - Application-level with `slowapi`
3. **Analytics Dashboard** - Visualize `chat_history`
4. **Streaming** - SSE for real-time responses
5. **A/B Testing** - Different prompts/models
6. **Monitoring** - Prometheus + Grafana
7. **Logging** - Structured logging with `structlog`

**But for a portfolio:** Current implementation is perfect.

## 💡 Philosophy

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

This backend prioritizes:
- **Clarity** over cleverness
- **Maintainability** over micro-optimizations
- **Intentional design** over cargo-culting
- **Working software** over perfect architecture

---

**Built to demonstrate:** Senior-level backend engineering judgment.
