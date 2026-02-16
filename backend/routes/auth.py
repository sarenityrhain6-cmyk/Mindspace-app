from fastapi import APIRouter, HTTPException, Depends, Header
from models.user import UserCreate, UserLogin, User, UserResponse, Token
from auth import get_password_hash, verify_password, create_access_token, decode_access_token
from database import db
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


async def get_current_user(authorization: str = Header(None)) -> User:
    """Dependency to get current authenticated user"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_dict = await db.users.find_one({"email": email}, {"_id": 0})
    if not user_dict:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_dict)


@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            has_paid=False,
            is_beta_tester=False,
            free_reflections_used=0
        )
        
        await db.users.insert_one(user.dict())
        
        # Create access token
        access_token = create_access_token(data={"sub": user.email})
        
        user_response = UserResponse(
            id=user.id,
            email=user.email,
            has_paid=user.has_paid,
            is_beta_tester=user.is_beta_tester,
            free_reflections_used=user.free_reflections_used
        )
        
        logger.info(f"New user registered: {user.email}")
        
        return Token(access_token=access_token, user=user_response)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during signup: {str(e)}")
        raise HTTPException(status_code=500, detail="Registration failed")


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login existing user"""
    try:
        # Find user
        user_dict = await db.users.find_one({"email": credentials.email}, {"_id": 0})
        if not user_dict:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        user = User(**user_dict)
        
        # Verify password
        if not verify_password(credentials.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create access token
        access_token = create_access_token(data={"sub": user.email})
        
        user_response = UserResponse(
            id=user.id,
            email=user.email,
            has_paid=user.has_paid,
            is_beta_tester=user.is_beta_tester,
            free_reflections_used=user.free_reflections_used
        )
        
        logger.info(f"User logged in: {user.email}")
        
        return Token(access_token=access_token, user=user_response)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during login: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        has_paid=current_user.has_paid,
        is_beta_tester=current_user.is_beta_tester,
        free_reflections_used=current_user.free_reflections_used
    )


@router.get("/access-check")
async def check_access(current_user: User = Depends(get_current_user)):
    """Check if user has access to paid features"""
    
    # BETA MODE: Everyone gets unlimited free access during beta testing (Weeks 4-6)
    # TODO: Re-enable payment requirement after beta (Week 7+)
    return {
        "has_access": True,
        "reason": "beta_period",
        "free_reflections_remaining": "unlimited",
        "message": "Free unlimited access during beta testing!"
    }
    
    # Original payment logic (commented out for beta):
    # # Beta testers get free access
    # if current_user.is_beta_tester:
    #     return {
    #         "has_access": True,
    #         "reason": "beta_tester",
    #         "free_reflections_remaining": "unlimited"
    #     }
    # 
    # # Paid users get full access
    # if current_user.has_paid:
    #     return {
    #         "has_access": True,
    #         "reason": "paid",
    #         "free_reflections_remaining": 0
    #     }
    # 
    # # Free users get 1 free reflection
    # if current_user.free_reflections_used < 1:
    #     return {
    #         "has_access": True,
    #         "reason": "free_trial",
    #         "free_reflections_remaining": 1 - current_user.free_reflections_used
    #     }
    # 
    # # No access - need to pay
    # return {
    #     "has_access": False,
    #     "reason": "payment_required",
    #     "free_reflections_remaining": 0
    # }
