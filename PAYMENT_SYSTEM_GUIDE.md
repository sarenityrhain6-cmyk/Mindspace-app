# MindSpace - $1 Payment System Implementation Guide

## 💰 Payment System Overview

**Model:** One-time $1 payment for full access  
**Free Trial:** 1 reflection free for all users  
**Beta Testers:** Unlimited free access  

---

## ✅ What's Been Implemented

### Backend Complete:
1. **Authentication System**
   - Email + password signup/login
   - JWT tokens (7-day expiration)
   - Secure password hashing (bcrypt)
   - Protected routes with Bearer token

2. **Payment Integration**
   - Stripe checkout (Emergent integration)
   - $1.00 one-time payment (fixed on backend)
   - Webhook handling for payment events
   - Transaction tracking in MongoDB

3. **Access Control**
   - Beta testers: Unlimited free access
   - Paid users: Full access forever
   - Free users: 1 free reflection
   - Paywall after free trial

4. **Database Collections**
   - `users`: Authentication + payment status
   - `payment_transactions`: All payment records
   - `beta_signups`: Original beta emails

---

## 📋 Frontend Implementation Needed

### Week 2 Tasks:

#### 1. **Authentication UI** (2-3 hours)
Create these pages:
- `/signup` - Email + password registration
- `/login` - Email + password login
- Add auth state management (Context or Redux)

#### 2. **Payment Flow** (2-3 hours)
Create these pages:
- `/paywall` - Shows when free trial ends
- `/payment-success` - Confirmation after payment
- `/payment-cancel` - User canceled payment

#### 3. **Protected Routes** (1 hour)
- Check auth token on app load
- Redirect to `/login` if not authenticated
- Check payment status before reflection module

---

## 🔐 API Endpoints Available

### Authentication:
```
POST /api/auth/signup
Body: { "email": "user@example.com", "password": "password123" }
Response: { "access_token": "jwt_token", "user": {...} }

POST /api/auth/login  
Body: { "email": "user@example.com", "password": "password123" }
Response: { "access_token": "jwt_token", "user": {...} }

GET /api/auth/me
Headers: Authorization: Bearer {token}
Response: { "id", "email", "has_paid", "is_beta_tester", "free_reflections_used" }

GET /api/auth/access-check
Headers: Authorization: Bearer {token}
Response: { "has_access": true/false, "reason": "...", "free_reflections_remaining": 1 }
```

### Payments:
```
POST /api/payments/create-checkout
Headers: Authorization: Bearer {token}
Body: {
  "package_id": "unlock_full_access",
  "origin_url": window.location.origin
}
Response: { "url": "stripe_checkout_url", "session_id": "..." }

GET /api/payments/checkout-status/{session_id}
Headers: Authorization: Bearer {token}
Response: { "status": "...", "payment_status": "paid/pending/..." }
```

---

## 🎨 Frontend Flow

### User Journey:

```
1. User lands on homepage
   ↓
2. Clicks "Join Beta" or "Get Started"
   ↓
3. Redirected to /signup
   ↓
4. Creates account (email + password)
   ↓
5. Auto-logged in, redirected to /app/welcome
   ↓
6. Goes through safety consent
   ↓
7. Reaches dashboard
   ↓
8. Clicks "Start Reflection"
   ↓
9. Check access:
   - If beta tester → Allow
   - If paid → Allow
   - If free_reflections < 1 → Allow & increment counter
   - If free_reflections >= 1 → Show paywall
   ↓
10. Paywall shows:
    "You've used your 1 free reflection.
     Unlock unlimited access for just $1!"
    [Pay $1 Button]
   ↓
11. User clicks pay → Redirect to Stripe
   ↓
12. User completes payment
   ↓
13. Redirected to /payment-success?session_id=xxx
   ↓
14. Frontend polls /api/payments/checkout-status
   ↓
15. On success: Show "Payment successful!" + redirect to dashboard
   ↓
16. User now has full access forever
```

---

## 💻 Frontend Code Examples

### 1. Auth Context (React)
```jsx
// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    const response = await axios.post(`${API}/auth/signup`, { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const checkAccess = async () => {
    const response = await axios.get(`${API}/auth/access-check`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Signup Page
```jsx
// src/pages/SignupPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      navigate('/app/welcome');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      <div className="container max-w-md py-12">
        <h1 className="heading-1 text-center mb-8">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="link-text">Log in</a>
        </p>
      </div>
    </div>
  );
};
```

### 3. Paywall Component
```jsx
// src/components/Paywall.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from './ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Paywall = () => {
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API}/payments/create-checkout`,
        {
          package_id: 'unlock_full_access',
          origin_url: window.location.origin
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Redirect to Stripe
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paywall-overlay">
      <div className="paywall-card">
        <h2 className="heading-2 mb-4">Unlock Full Access</h2>
        <p className="body-large mb-6">
          You've used your 1 free reflection. 
          <br />
          Unlock unlimited reflections for just <strong>$1</strong>.
        </p>
        <ul className="body-medium mb-8 space-y-2">
          <li>✓ Unlimited reflections</li>
          <li>✓ Track your progress over time</li>
          <li>✓ Access regulation tools</li>
          <li>✓ One-time payment, lifetime access</li>
        </ul>
        <Button
          className="btn-primary w-full"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay $1 to Unlock'}
        </Button>
      </div>
    </div>
  );
};
```

### 4. Payment Success Page
```jsx
// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      pollPaymentStatus();
    }
  }, [sessionId]);

  const pollPaymentStatus = async (attempts = 0) => {
    const maxAttempts = 5;
    if (attempts >= maxAttempts) {
      setStatus('timeout');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API}/payments/checkout-status/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.payment_status === 'paid') {
        setStatus('success');
        setTimeout(() => navigate('/app/dashboard'), 3000);
      } else if (response.data.status === 'expired') {
        setStatus('expired');
      } else {
        setTimeout(() => pollPaymentStatus(attempts + 1), 2000);
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="app-page">
      <div className="container max-w-md py-12 text-center">
        {status === 'checking' && <p>Verifying payment...</p>}
        {status === 'success' && (
          <>
            <h1 className="heading-1 mb-4">🎉 Payment Successful!</h1>
            <p className="body-large">
              You now have full access to MindSpace.
              <br />
              Redirecting to dashboard...
            </p>
          </>
        )}
        {status === 'error' && <p>Payment verification failed.</p>}
      </div>
    </div>
  );
};
```

---

## 🧪 Testing Guide

### Test Accounts:

**Beta Tester (Free Forever):**
1. Create user account
2. Manually set in MongoDB:
   ```
   db.users.updateOne(
     { email: "tester@example.com" },
     { $set: { is_beta_tester: true } }
   )
   ```

**Regular User (1 Free + $1):**
1. Create account normally
2. Use 1 free reflection
3. See paywall

**Stripe Test Card:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## 📱 Mobile App Payments (Week 7-8)

For Android, you'll need to add **Google Play In-App Billing** alongside Stripe:

1. Users on mobile pay via Google Play
2. Users on web pay via Stripe
3. Backend tracks both payment methods
4. Cross-platform access (pay once, use everywhere)

---

## 💰 Revenue Breakdown

**Per $1 Payment:**
- Stripe fee: ~$0.30 (30% for small transactions)
- Your revenue: ~$0.70
- At 100 users: $70
- At 1,000 users: $700
- At 10,000 users: $7,000

**Tips to improve margins:**
- Offer $5 one-time instead (Stripe takes less %)
- Add optional $1/month subscription tier
- Upsell future features

---

## ✅ Next Steps

**Immediate (Week 2):**
1. Create auth UI (signup, login pages)
2. Add Auth context to App.js
3. Create paywall component
4. Add payment success/cancel pages
5. Test full payment flow

**Week 3:**
- Add reflection counter logic
- Build reflection module with access check
- Test with real Stripe test mode

**Week 7-8:**
- Add Google Play In-App Billing for mobile

---

**Your $1 payment system is ready on the backend! Time to build the frontend UI.** 🚀
