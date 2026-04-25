from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import google.generativeai as genai

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure Gemini
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SYSTEM_PROMPT_BASE = """You are NyayaSakhi (meaning "Legal Friend"), a compassionate AI assistant for women's legal support and emotional safety in India.

Your approach for EVERY message:
1. FIRST: Acknowledge the user's feelings with warmth and empathy (1-2 sentences max)
2. THEN: Identify the type of legal issue if mentioned
3. FINALLY: Provide clear, numbered, actionable steps (3-5 steps max)

Key topics you help with:
- Workplace sexual harassment (POSH Act 2013)
- Domestic violence (Protection of Women from Domestic Violence Act 2005)
- Stalking, eve-teasing (IPC Section 354D, 509)
- Cyber harassment and online abuse (IT Act, Section 66A, 67)
- Rights as a tenant/roommate
- Marriage, divorce, and property rights
- Dowry harassment (IPC Section 498A)

CRITICAL RULES:
- Use simple language, avoid complex legal jargon unless you explain it
- Give emergency numbers when urgently needed: Women Helpline: 1091, Police: 100, NCW: 011-26942369, Childline: 1098
- Be non-judgmental, warm, and encouraging
- Keep responses focused (aim for 150-200 words)
- End with a brief reassuring note
- You are a support guide, not a replacement for professional legal counsel
- If someone seems in immediate danger, immediately provide emergency numbers first.

LANGUAGE & TONE — CRITICAL:
- ALWAYS reply in the SAME script the user writes in.
- Use a CASUAL, sisterly tone — like a slightly older, caring sister, not a formal lawyer.
- English: friendly, supportive, modern — avoid corporate/legal jargon
- Helpline numbers MUST appear as DIGITS, not as words."""


def get_age_persona(age: Optional[int]) -> str:
    if age is None:
        return ""
    if age < 13:
        return "\n\nUSER AGE CONTEXT: The user is a CHILD (under 13). Use very simple words. Prioritize Childline 1098. Encourage telling a trusted adult immediately."
    if age <= 19:
        return "\n\nUSER AGE CONTEXT: The user is a TEENAGER (13-19). Use simple, friendly, sister-like language. Mention Childline 1098 and POCSO Act when relevant."
    if age <= 35:
        return "\n\nUSER AGE CONTEXT: The user is a YOUNG ADULT (20-35). Use modern, direct language. Reference POSH Act, IT Act, Section 354D when relevant."
    if age <= 55:
        return "\n\nUSER AGE CONTEXT: The user is an ADULT (36-55). Use respectful, mature tone. Reference DV Act 2005, Section 498A when relevant."
    return "\n\nUSER AGE CONTEXT: The user is a SENIOR (55+). Use very respectful, patient tone. Reference Senior Citizens Act 2007 when relevant."


# Store chat history per session
chat_histories = {}


class ChatRequest(BaseModel):
    session_id: str
    message: str
    language: str = "en"
    user_name: str = "Friend"
    user_age: Optional[int] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


class ChatHistoryResponse(BaseModel):
    messages: List[dict]
    session_id: str


@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        system_message = SYSTEM_PROMPT_BASE + get_age_persona(request.user_age)

        # Get or create chat history for this session
        if request.session_id not in chat_histories:
            chat_histories[request.session_id] = []

        history = chat_histories[request.session_id]

        # Build conversation for Gemini
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_message
        )

        # Convert history to Gemini format
        gemini_history = []
        for msg in history:
            gemini_history.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [msg["content"]]
            })

        chat_session = model.start_chat(history=gemini_history)
        response = chat_session.send_message(request.message)
        response_text = response.text

        # Update in-memory history
        chat_histories[request.session_id].append({"role": "user", "content": request.message})
        chat_histories[request.session_id].append({"role": "assistant", "content": response_text})

        # Save to MongoDB
        timestamp = datetime.now(timezone.utc).isoformat()
        await db.chat_messages.update_one(
            {"session_id": request.session_id},
            {
                "$push": {
                    "messages": {
                        "$each": [
                            {"role": "user", "content": request.message, "timestamp": timestamp},
                            {"role": "assistant", "content": response_text, "timestamp": timestamp}
                        ]
                    }
                },
                "$setOnInsert": {"session_id": request.session_id, "created_at": timestamp}
            },
            upsert=True
        )

        return ChatResponse(response=response_text, session_id=request.session_id)

    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(
            response="I'm here for you. Please try again in a moment, or call Women Helpline 1091 if you need immediate help.",
            session_id=request.session_id
        )


@api_router.get("/chat/history/{session_id}", response_model=ChatHistoryResponse)
async def get_chat_history(session_id: str):
    doc = await db.chat_messages.find_one({"session_id": session_id}, {"_id": 0})
    if not doc:
        return ChatHistoryResponse(messages=[], session_id=session_id)
    return ChatHistoryResponse(messages=doc.get("messages", []), session_id=session_id)


@api_router.delete("/chat/session/{session_id}")
async def clear_session(session_id: str):
    if session_id in chat_histories:
        del chat_histories[session_id]
    await db.chat_messages.delete_one({"session_id": session_id})
    return {"message": "Session cleared"}


@api_router.get("/")
async def root():
    return {"message": "NyayaSakhi API running"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
