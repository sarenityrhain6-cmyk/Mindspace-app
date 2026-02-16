from fastapi import APIRouter, HTTPException, Depends, Request
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest
from models.user import User, PaymentTransaction
from routes.auth import get_current_user
from database import db
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

# Fixed payment package - $1 one-time payment
PAYMENT_PACKAGES = {
    "unlock_full_access": {
        "amount": 1.00,  # MUST be float for Stripe
        "currency": "usd",
        "description": "MindSpace Full Access - One-time payment"
    }
}


@router.post("/create-checkout", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    request: Request,
    package_id: str,
    origin_url: str,
    current_user: User = Depends(get_current_user)
):
    """
    Create Stripe checkout session for $1 payment
    """
    try:
        # Validate package
        if package_id not in PAYMENT_PACKAGES:
            raise HTTPException(status_code=400, detail="Invalid payment package")
        
        # Check if user already paid
        if current_user.has_paid:
            raise HTTPException(status_code=400, detail="You have already unlocked full access")
        
        # Get package details (amount defined on backend only!)
        package = PAYMENT_PACKAGES[package_id]
        amount = package["amount"]
        currency = package["currency"]
        
        # Initialize Stripe
        api_key = os.environ.get("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Payment system not configured")
        
        # Build webhook URL
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        # Build success and cancel URLs from frontend origin
        success_url = f"{origin_url}/payment-success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{origin_url}/payment-cancel"
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=amount,
            currency=currency,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "user_id": current_user.id,
                "email": current_user.email,
                "package_id": package_id,
                "app": "mindspace"
            }
        )
        
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record BEFORE redirect
        transaction = PaymentTransaction(
            user_id=current_user.id,
            email=current_user.email,
            session_id=session.session_id,
            amount=amount,
            currency=currency,
            payment_status="pending",
            metadata=checkout_request.metadata
        )
        
        await db.payment_transactions.insert_one(transaction.dict())
        
        logger.info(f"Checkout session created for user {current_user.email}: {session.session_id}")
        
        return session
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create payment session")


@router.get("/checkout-status/{session_id}", response_model=CheckoutStatusResponse)
async def get_checkout_status(
    session_id: str,
    current_user: User = Depends(get_current_user)
):
    """
    Check payment status and update database
    """
    try:
        # Initialize Stripe
        api_key = os.environ.get("STRIPE_API_KEY")
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        
        # Get status from Stripe
        status_response = await stripe_checkout.get_checkout_status(session_id)
        
        # Find transaction in database
        transaction = await db.payment_transactions.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )
        
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        # Update transaction status if changed
        if transaction["payment_status"] != status_response.payment_status:
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "payment_status": status_response.payment_status,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            # If payment successful, unlock user access
            if status_response.payment_status == "paid":
                # Check if we haven't already processed this payment
                user = await db.users.find_one({"id": transaction["user_id"]})
                if user and not user.get("has_paid"):
                    await db.users.update_one(
                        {"id": transaction["user_id"]},
                        {"$set": {"has_paid": True}}
                    )
                    logger.info(f"User {transaction['email']} unlocked full access via payment")
        
        return status_response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error checking payment status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """
    Handle Stripe webhook events
    """
    try:
        # Get raw body and signature
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="No signature provided")
        
        # Initialize Stripe
        api_key = os.environ.get("STRIPE_API_KEY")
        webhook_url = str(request.base_url).rstrip('/') + "/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Process payment completion
        if webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            metadata = webhook_response.metadata
            
            # Update transaction
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "payment_status": "paid",
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            # Unlock user access
            if metadata and "user_id" in metadata:
                user = await db.users.find_one({"id": metadata["user_id"]})
                if user and not user.get("has_paid"):
                    await db.users.update_one(
                        {"id": metadata["user_id"]},
                        {"$set": {"has_paid": True}}
                    )
                    logger.info(f"Webhook: User {metadata.get('email')} unlocked via payment")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")
