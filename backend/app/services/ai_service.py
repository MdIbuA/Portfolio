"""
AI Service Layer - Handles all OpenRouter API interactions.
Responsible for prompt engineering and API communication.
"""
import json
import httpx
from pathlib import Path
from app.config import Settings


class AIService:
    """
    Encapsulates AI interaction logic.
    Single responsibility: communicate with OpenRouter API.
    """
    
    def __init__(self, settings: Settings):
        self.api_key = settings.openrouter_api_key
        self.model = settings.openrouter_model
        self.api_url = "https://openrouter.ai/api/v1/chat/completions"
        self.resume_data = self._load_resume()
        self.system_prompt = self._build_system_prompt()
    
    def _load_resume(self) -> dict:
        """Load structured resume data from JSON file."""
        resume_path = Path(__file__).parent.parent.parent / "data" / "resume.json"
        with open(resume_path, "r", encoding="utf-8") as f:
            return json.load(f)
    
    def _build_system_prompt(self) -> str:
        """
        Construct system prompt with Ibu persona and resume context.
        
        Design decisions:
        - Ibu is Mohamed's professional AI assistant
        - Embed full resume in system prompt (small data, no need for RAG)
        - Explicit instructions to prevent hallucinations
        - Professional, helpful tone
        
        CRITICAL: AI persona logic lives in backend, NOT frontend.
        Frontend only displays messages - backend controls behavior.
        """
        resume_json = json.dumps(self.resume_data, indent=2)
        
        return f"""You are Ibu, Mohamed Ibrahim A's professional AI assistant.

Your role is to help visitors learn about Mohamed's background, skills, and experience by answering their questions based STRICTLY on the resume data provided below.

PERSONA:
- Name: Ibu
- Role: Professional assistant representing Mohamed
- Tone: Friendly, professional, helpful
- Behavior: Factual, grounded, concise

STRICT RULES:
1. Answer ONLY using information from the resume data below
2. If information is not in the resume, respond: "I don't have that information in Mohamed's resume. Feel free to ask about his skills, experience, or projects!"
3. Be concise and professional - aim for 2-3 sentences unless more detail is requested
4. Use first-person when referring to Mohamed (e.g., "Mohamed has experience with..." or "He specializes in...")
5. Never make assumptions or add information not present in the data
6. If asked about yourself, briefly explain: "I'm Ibu, Mohamed's AI assistant. I'm here to help you learn about his background and experience!"

RESUME DATA:
{resume_json}

Remember: You represent Mohamed professionally. Accuracy and helpfulness are your priorities."""
    
    async def get_answer(self, question: str) -> str:
        """
        Send question to OpenRouter API and return grounded answer.
        
        Args:
            question: User's question about the resume
            
        Returns:
            AI-generated answer grounded in resume data
            
        Raises:
            httpx.HTTPError: If API request fails
            ValueError: If rate limited or API error
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": question}
            ],
            "temperature": 0.3,  # Low temperature for factual, consistent answers
            "max_tokens": 300,   # Keep answers concise
        }
        
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                )
                
                # Handle rate limiting
                if response.status_code == 429:
                    raise ValueError("The AI service is currently rate-limited. Please try again in a moment.")
                
                # Handle other errors
                if response.status_code != 200:
                    error_detail = response.text
                    raise ValueError(f"AI service error: {error_detail}")
                
                data = response.json()
                return data["choices"][0]["message"]["content"].strip()
                
        except httpx.TimeoutException:
            raise ValueError("The AI service took too long to respond. Please try again.")
        except httpx.HTTPError as e:
            raise ValueError(f"Failed to connect to AI service: {str(e)}")

