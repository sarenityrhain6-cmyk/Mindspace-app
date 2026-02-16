from fastapi import APIRouter, HTTPException
from models.beta_signup import BetaSignup, BetaSignupCreate, BetaSignupResponse
from database import db
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/beta-signup", response_model=BetaSignupResponse)
async def create_beta_signup(signup_data: BetaSignupCreate):
    """
    Store beta signup email in database
    """
    try:
        # Check if email already exists
        existing_signup = await db.beta_signups.find_one({"email": signup_data.email})
        
        if existing_signup:
            return BetaSignupResponse(
                success=True,
                message="You're already on the list! We'll be in touch soon.",
                email=signup_data.email
            )
        
        # Create new signup
        signup = BetaSignup(email=signup_data.email)
        await db.beta_signups.insert_one(signup.dict())
        
        logger.info(f"New beta signup: {signup_data.email}")
        
        return BetaSignupResponse(
            success=True,
            message="Thank you for joining the beta! We'll be in touch soon.",
            email=signup_data.email
        )
        
    except Exception as e:
        logger.error(f"Error creating beta signup: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Something went wrong. Please try again."
        )


@router.get("/beta-signups")
async def get_beta_signups():
    """
    Get all beta signups (for admin purposes)
    """
    try:
        signups = await db.beta_signups.find().to_list(1000)
        return {
            "success": True,
            "count": len(signups),
            "signups": [
                {
                    "email": signup["email"],
                    "created_at": signup["created_at"],
                    "status": signup["status"]
                }
                for signup in signups
            ]
        }
    except Exception as e:
        logger.error(f"Error fetching beta signups: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error fetching signups"
        )
