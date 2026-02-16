# MindSpace - Product Requirements Document (PRD)

**Last Updated:** December 17, 2024  
**Version:** Week 1 MVP

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

## 4. What's Been Implemented (Week 1 - Dec 17, 2024)

### ✅ Completed Features

#### Landing Page (`/`)
- Hero section with gradient background
- "What It Is" section with calming nature imagery
- "Who It's For" cards (3 user types)
- Safety section with crisis contact buttons
- Email collection form (beta signup)
- **Backend Integration:** Stores emails in MongoDB via `/api/beta-signup`

#### Terms & Safety Page (`/terms`)
- Complete Terms of Use document
- Scrollable content area
- Checkbox consent requirement
- Crisis disclaimer section
- Navigation to app or back to landing

#### Welcome Screen (`/app/welcome`)
- Welcoming hero icon
- Educational purpose statement
- Calming image
- Continue button → Safety Consent

#### Safety Consent Screen (`/app/safety-consent`)
- "Before We Begin" alert
- Important information section
- Crisis contact cards (tel:988, tel:911, tel:emergency)
- Acknowledgment list (4 points)
- "I Understand & Agree" button
- Emergency support external link

#### Dashboard (`/app/dashboard`)
- 4 cards: Start Reflection, View Results, Regulation Tool, Emergency Support
- Placeholder buttons for Week 2-3 features
- Always-visible 988 button in header
- Clean grid layout

### Backend API Endpoints
```
POST /api/beta-signup
  - Stores email in MongoDB
  - Returns success message
  - Prevents duplicate signups

GET /api/beta-signups  
  - Admin endpoint to view all signups
  - Returns count and email list
```

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

### P0 - Week 2 (Next Phase)
- [ ] Build 10-question reflection module
- [ ] Implement 0-3 scale rating UI
- [ ] Create scoring logic (0-9, 10-19, 20-30 ranges)
- [ ] Display score interpretation
- [ ] Store reflections in MongoDB
- [ ] "View Last Result" functionality

### P1 - Week 3
- [ ] Breathing timer (60 seconds, 4-4-6 pattern)
- [ ] Grounding exercise (5-4-3 technique)
- [ ] Regulation tool page
- [ ] Dashboard navigation improvements

### P2 - Week 4-6 (Testing & Refinement)
- [ ] User testing with 2-3 trusted individuals
- [ ] Google Form for feedback collection
- [ ] Tone and language refinement
- [ ] Remove any diagnostic-sounding language
- [ ] Stability improvements

### Future Considerations (Post-Beta)
- [ ] User accounts with authentication
- [ ] Reflection history tracking
- [ ] Weekly check-in reminders
- [ ] Expand to 20 questions
- [ ] Simple reflection journal
- [ ] Progress tracker

---

## 8. Next Tasks (Immediate)

1. ✅ Week 1 Complete - Landing page, Terms, Welcome, Safety Consent, Dashboard with email collection working
2. **Week 2 Focus:** Build the 10-question reflection module
3. Begin planning scoring display UI
4. Design reflection results page

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
