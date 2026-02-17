# MindSpace - Product Requirements Document (PRD)

**Last Updated:** February 17, 2026  
**Version:** v1.0 Complete (Week 1-3 Features + Mobile Setup)

---

## 1. Original Problem Statement

Build MindSpace - a trauma-informed self-reflection tool designed to help users recognize emotional patterns and understand nervous system responses. This is an educational platform, NOT therapy or medical treatment.

The app will be built in weekly phases:
- **Week 1:** Landing page + Safety/Terms pages + Welcome + Safety Consent screens + Dashboard (placeholders)
- **Week 2:** 10-question reflection module + scoring logic
- **Week 3:** Regulation tools + enhanced navigation
- **Week 4-6:** Testing, refinement, and feedback collection

---

## 2. User Personas

### Primary Users
1. **Self-Awareness Seekers** - Individuals wanting emotional clarity and pattern recognition
2. **Stress Pattern Observers** - People noticing repeated stress responses in daily life  
3. **Personal Growth Enthusiasts** - Anyone building deeper self-awareness

### User Constraints
- Must NOT be in active crisis
- Seeking educational self-reflection, not clinical diagnosis
- Comfortable with technology and self-guided tools

---

## 3. Core Requirements (Static)

### Non-Negotiable Features
1. **Safety First Approach**
   - Clear disclaimers on every page
   - Prominent crisis support links (988, 911)
   - Tel links for immediate phone access
   - Educational purpose clearly stated

2. **Trauma-Informed Design**
   - Gentle, non-diagnostic language
   - User control over pace and engagement
   - No forced progression
   - Calming visual design (green accent system)

3. **Data Privacy (Beta Phase)**
   - Minimal data collection (email, nickname only)
   - No sensitive personal trauma details stored
   - MongoDB backend for proper storage

### Technical Stack
- **Frontend:** React, Shadcn UI, TailwindCSS
- **Backend:** FastAPI, Python
- **Database:** MongoDB
- **Design System:** Green-ai (clean, minimal, professional)

---

## 4. What's Been Implemented (Completed Feb 17, 2026)

### ✅ All Core Features Implemented & Tested

#### Authentication System
- **Signup** (`/signup`): Email/password registration with JWT
- **Login** (`/login`): JWT authentication 
- **Protected Routes**: Dashboard, Reflection, Regulation tools require auth
- **Beta Mode**: Payment bypassed for unlimited free access

#### Landing Page (`/`)
- Hero section with gradient background
- "What It Is" section with calming nature imagery
- "Who It's For" cards (3 user types)
- Safety section with crisis contact buttons
- "Get Started - Free Trial" CTA button

#### User Flow Pages
- **Welcome** (`/app/welcome`): Educational purpose statement
- **Safety Consent** (`/app/safety-consent`): Crisis acknowledgment
- **Dashboard** (`/app/dashboard`): Navigation to all features
  - Start Reflection button
  - View Results button  
  - Regulation Tool button
  - Beta access banner

#### 10-Question Reflection Module (`/app/reflection`)
- 10 trauma-informed questions
- 0-3 scale (Never, Sometimes, Often, Almost Always)
- Auto-advance to next question
- Progress bar and question dots
- "See My Results" button on completion

#### Results Page (`/app/reflection-results`)
- Total score display (0-30)
- Score interpretation:
  - 0-9: Lower Activation Patterns
  - 10-19: Moderate Activation Patterns
  - 20-30: Higher Activation Patterns
- Educational disclaimer

#### Regulation Tools (`/app/regulation`)
- **Breathing Exercise**: 4-4-6 pattern with animated circle
  - Start/Pause/Reset controls
  - Time and cycles counter
- **5-4-3-2-1 Grounding Technique**: Step-by-step guide

#### Legal Pages
- **Terms** (`/terms`): Terms of Service
- **Privacy** (`/privacy`): Privacy Policy (required for Play Store)

### Backend API Endpoints (All Working)
```
POST /api/auth/signup
  - Creates new user with hashed password
  - Returns JWT token and user data

POST /api/auth/login
  - Authenticates user credentials
  - Returns JWT token and user data

GET /api/auth/me
  - Returns current user info (requires auth)

GET /api/auth/access-check
  - Returns beta_period access (always has_access: true)

POST /api/beta-signup
  - Stores beta tester emails in MongoDB

GET /health
  - Health check endpoint for monitoring
```

### Testing Status (Feb 17, 2026)
- **Backend**: 100% tests passing (21 tests)
- **Frontend**: All flows tested and working
- **E2E**: Signup → Login → Reflection → Results → Regulation all verified

### Design System Implementation
- Green accent colors (#8FEC78, #81DD67)
- System fonts for performance
- Responsive typography with clamp()
- Pill-shaped buttons with green gradients
- Clean white cards with subtle shadows
- Mobile-responsive breakpoints

---

## 5. API Contracts

### Beta Signup Endpoint
```
POST /api/beta-signup
Request: { "email": "user@example.com" }
Response: {
  "success": true,
  "message": "Thank you for joining the beta!",
  "email": "user@example.com"
}
```

### Future Endpoints (Week 2-3)
```
POST /api/reflections (Week 2)
  - Submit 10-question responses
  - Calculate score
  - Store in MongoDB

GET /api/reflections/:user_id (Week 2)
  - Retrieve user's reflection history

POST /api/regulation-sessions (Week 3)
  - Track breathing exercise sessions
```

---

## 6. Data Models

### Current (Week 1)
```python
BetaSignup:
  - id: UUID
  - email: EmailStr
  - created_at: DateTime
  - status: str (default: "pending")
```

### Future (Week 2)
```python
ReflectionResponse:
  - id: UUID
  - user_id: str
  - responses: List[int] (0-3 scale)
  - total_score: int (0-30)
  - interpretation: str
  - created_at: DateTime
```

---

## 7. Prioritized Backlog

### ✅ COMPLETED
- [x] User authentication (signup/login/JWT)
- [x] 10-question reflection module
- [x] 0-3 scale rating UI
- [x] Scoring logic (0-9, 10-19, 20-30 ranges)
- [x] Score interpretation display
- [x] Breathing timer (4-4-6 pattern)
- [x] Grounding exercise (5-4-3-2-1 technique)
- [x] Regulation tool page
- [x] Dashboard navigation
- [x] Mobile app setup (Capacitor + Android)

### P0 - Immediate Next Steps
- [ ] Build Android APK using Android Studio (see `/app/BUILD_ANDROID_APK.md`)
- [ ] Test APK on Android device
- [ ] Create custom app icon and splash screen
- [ ] Complete Google Play Developer account setup ($25)

### P1 - After Android Release
- [ ] Set up Google Form for beta feedback
- [ ] Re-enable payment system after beta
- [ ] Submit to Google Play Store

### P2 - Future Enhancements (Post-Beta v2.0)
- [ ] Expand to 20 questions
- [ ] Reflection history/tracking
- [ ] Simple reflection journal
- [ ] Progress tracker
- [ ] Push notifications
- [ ] Dark mode support
- [ ] iOS version

---

## 8. Next Steps for Android App

1. **Download Project**: Use "Save to Github" in Emergent
2. **Install Android Studio**: https://developer.android.com/studio
3. **Build APK**: Follow `/app/BUILD_ANDROID_APK.md`
4. **Test on Device**: Install APK on Android phone
5. **Submit to Play Store**: Complete listing and submit for review

**Detailed Guide**: `/app/BUILD_ANDROID_APK.md`

---

## 9. Success Metrics (Beta Phase)

### Week 1 (Completed)
- ✅ All pages load without errors
- ✅ Email collection stores in MongoDB
- ✅ Navigation flow works smoothly
- ✅ Crisis links functional (tel: protocol)
- ✅ Design follows green-ai guidelines

### Week 2 (Target)
- Users complete all 10 questions
- Scoring logic calculates correctly
- Interpretations display appropriately
- No confusion about educational vs. clinical

### Week 4-6 (Target)
- 100% of testers complete the reflection module
- Users report feeling emotionally safe
- Zero reports of feeling diagnosed or labeled
- Positive feedback on tone and clarity

---

## 10. Constraints & Guardrails

### Emotional Safety
- Never use diagnostic terms (anxiety disorder, PTSD, etc.)
- Always emphasize educational purpose
- Prominent crisis resources on every page
- User can exit at any time

### Scope Control (Founder Wellbeing)
- Max 4-6 hours build time per week
- No "just one more feature" additions
- Stop when tired - sustainable pace
- RN school is primary focus

### Legal & Ethical
- Not a substitute for professional care
- No medical claims
- Clear disclaimers throughout
- Crisis intervention redirect (not provide)

---

## 11. Technical Notes

### Environment Setup
- Frontend: `REACT_APP_BACKEND_URL` in `/app/frontend/.env`
- Backend: `MONGO_URL` and `DB_NAME` in `/app/backend/.env`
- Crisis links use `tel:` protocol for mobile dialing

### Component Structure
```
/app/frontend/src/
  - pages/
    - LandingPage.jsx
    - TermsPage.jsx
    - WelcomePage.jsx
    - SafetyConsentPage.jsx
    - DashboardPage.jsx
  - mockData.js (legacy - now using real API)
```

### Design Philosophy
- Clean minimalism over complexity
- Professional mental health aesthetic
- Green = growth, healing, nature
- White space = calm, clarity
- Pill buttons = soft, approachable

---

**End of Week 1 PRD**

---

## 12. Mobile App Development Plan (Week 7-8)

### **Platform:** Android (Google Play Store)

### **Approach:** Capacitor (Wrap Existing React App)

**Rationale:**
- 95% code reuse from web app
- Fastest time to market (2-3 weeks)
- Single codebase maintenance
- Native features when needed

### **Week 7 Tasks:**
1. ✅ Install Capacitor dependencies
2. ✅ Configure Android platform
3. ✅ Add mobile plugins (StatusBar, SplashScreen, App, Haptics)
4. ✅ Create mobile initialization (capacitor.js)
5. ✅ Add Privacy Policy page (/privacy)
6. Build React app → test on Android
7. Optimize UI for mobile touch targets
8. Test all flows on device/emulator

### **Week 8 Tasks:**
1. Create app assets (icon, splash, feature graphic, screenshots)
2. Set up Google Play Developer account ($25)
3. Generate signed APK/AAB
4. Complete Play Store listing
5. Submit for review (1-7 days)
6. Launch on Play Store!

### **Mobile-Specific Features Implemented:**
- ✅ Capacitor v7 integrated
- ✅ Android platform configured
- ✅ Status bar styling (green brand color)
- ✅ Splash screen (2-second display)
- ✅ Back button handler
- ✅ App state management
- ✅ Privacy policy page (required for Play Store)

### **App Details:**
- **Package ID:** com.mindspace.app
- **App Name:** MindSpace
- **Category:** Health & Fitness
- **Target:** Android 7.0+ (API 24+)
- **Size:** ~10-15 MB

### **Google Play Store Requirements:**
- ✅ Privacy Policy URL: /privacy
- ✅ Terms of Service URL: /terms
- ✅ Crisis disclaimers clear
- ✅ Educational purpose stated
- ✅ Content rating: Everyone/Teen
- ✅ App icon (512x512px) - pending
- ✅ Feature graphic (1024x500px) - pending
- ✅ Screenshots (2+ required) - pending

### **Post-Launch (Week 9+):**
- Monitor Play Store reviews
- Track download metrics
- Respond to user feedback
- Consider iOS version if successful

### **Mobile App Guide:**
Complete setup instructions: `/app/MOBILE_APP_GUIDE.md`

---

**End of PRD - Updated: December 17, 2024 (Mobile App Plan Added)**
