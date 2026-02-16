from fastapi import APIRouter, HTTPException, Depends
from models.user import User
from routes.auth import get_current_user
from database import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/increment-free-usage")
async def increment_free_usage(current_user: User = Depends(get_current_user)):
    """
    Increment the free reflections used counter for free users
    """
    try:
        # Only increment for free users (not paid, not beta)
        if current_user.has_paid or current_user.is_beta_tester:
            return {"success": True, "message": "User has unlimited access"}
        
        # Increment counter
        result = await db.users.update_one(
            {"id": current_user.id},
            {"$inc": {"free_reflections_used": 1}}
        )
        
        if result.modified_count > 0:
            logger.info(f"Incremented free usage for user {current_user.email}")
            return {
                "success": True,
                "free_reflections_used": current_user.free_reflections_used + 1
            }
        else:
            return {"success": False, "message": "Failed to update counter"}
            
    except Exception as e:
        logger.error(f"Error incrementing free usage: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update usage")
