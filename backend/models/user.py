from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid


class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    hashed_password: str
    has_paid: bool = Field(default=False)
    is_beta_tester: bool = Field(default=False)
    free_reflections_used: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    has_paid: bool
    is_beta_tester: bool
    free_reflections_used: int


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    email: str
    session_id: str
    amount: float
    currency: str = "usd"
    payment_status: str = Field(default="pending")  # pending, paid, failed, expired
    metadata: Optional[dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
