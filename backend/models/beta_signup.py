from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class BetaSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")


class BetaSignupCreate(BaseModel):
    email: EmailStr


class BetaSignupResponse(BaseModel):
    success: bool
    message: str
    email: Optional[str] = None
