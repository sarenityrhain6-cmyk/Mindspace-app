# MindSpace Mobile App - Complete Setup Guide

## 📱 Google Play Store Submission Checklist

### ✅ Current Status (Updated Feb 2026)

**What's Done:**
- ✅ React web app built and tested
- ✅ Capacitor initialized and configured
- ✅ Android project created (`/app/frontend/android/`)
- ✅ Web assets synced to Android project
- ✅ App ID: `com.mindspace.app`
- ✅ App Name: `MindSpace`

**What You Need to Do (on your local machine):**
1. Download the project
2. Install Android Studio
3. Build the APK

---

## **Phase 1: Local Setup (Your Computer)**

### Prerequisites
You need to install these on YOUR computer:
- **Android Studio** (https://developer.android.com/studio)
- **Java JDK 17** (usually bundled with Android Studio)

### Step 1: Download the Project
Use the "Save to Github" feature in Emergent, then clone to your machine:
```bash
git clone <your-github-repo-url>
cd <project-name>/frontend
```

### Step 2: Install Dependencies
```bash
yarn install
```

### Step 3: Build React App (if not already built)
```bash
yarn build
```

### Step 4: Sync with Capacitor
```bash
npx cap sync android
```

### Step 5: Open in Android Studio
```bash
npx cap open android
```

### Step 4: Test on Device/Emulator
- Connect Android device or start emulator
- Click "Run" in Android Studio
- Test all features:
  - [ ] Landing page loads
  - [ ] Email signup works
  - [ ] Terms acceptance works
  - [ ] Welcome screen displays
  - [ ] Safety consent works
  - [ ] Dashboard loads
  - [ ] Crisis tel: links work (988, 911)
  - [ ] Back button navigation works

---

## **Phase 2: Create App Assets (Week 8)**

### Required Assets:

#### 1. **App Icon (512x512px)**
- Format: PNG, no transparency
- File: `icon.png`
- Location: `/app/frontend/resources/icon.png`
- Design: MindSpace logo with green (#8FEC78) background

#### 2. **Splash Screen (2732x2732px)**
- Format: PNG
- File: `splash.png`
- Location: `/app/frontend/resources/splash.png`
- Design: MindSpace logo centered on green gradient

#### 3. **Feature Graphic (1024x500px)**
- Format: PNG or JPEG
- Required for Play Store listing
- Design: MindSpace branding with tagline

#### 4. **Screenshots (at least 2)**
Required sizes:
- Phone: 1080x1920px minimum
- Tablet (optional): 1536x2048px minimum

Screenshots needed:
1. Landing page / Hero section
2. Reflection questions (Week 2)
3. Safety consent screen
4. Dashboard view
5. Regulation tool (Week 3)

---

## **Phase 3: Google Play Console Setup**

### Prerequisites:
- [ ] Google Play Developer Account ($25 one-time)
- [ ] Privacy Policy URL: https://nervous-system-check.emergent.host/privacy
- [ ] Terms of Service URL: https://nervous-system-check.emergent.host/terms

### Store Listing Information:

#### App Details:
```
App Name: MindSpace
Short Description: Understand your emotional patterns through trauma-informed self-reflection
Full Description:
MindSpace is a trauma-informed educational tool designed to help you recognize 
emotional patterns and understand nervous system responses.

Key Features:
• 10-question self-reflection module
• Pattern recognition scoring
• Breathing exercises and regulation tools
• Educational nervous system awareness
• Crisis support resources

IMPORTANT: This is an educational platform, not therapy or medical treatment.
If you're in crisis, call 988 (U.S.) or local emergency services.

Category: Health & Fitness
Tags: mental health, self-care, mindfulness, emotional wellness, trauma-informed
```

#### Contact Information:
```
Email: support@mindspace.app (update with your email)
Website: https://nervous-system-check.emergent.host
Privacy Policy: https://nervous-system-check.emergent.host/privacy
```

#### Content Rating:
- Use Google's content rating questionnaire
- Answer honestly about mental health educational content
- Expected rating: Everyone or Teen
- Declare: Educational mental health content, crisis resources included

---

## **Phase 4: Build Signed APK/AAB**

### Generate Keystore:
```bash
cd /app/frontend/android
keytool -genkey -v -keystore mindspace-release-key.keystore -alias mindspace -keyalg RSA -keysize 2048 -validity 10000
```

**Save this information securely:**
- Keystore password: [YOUR_PASSWORD]
- Key alias: mindspace
- Key password: [YOUR_KEY_PASSWORD]

⚠️ **CRITICAL:** Never lose this keystore! You cannot update your app without it.

### Configure Signing in Android Studio:
1. Open `android/app/build.gradle`
2. Add signing configuration
3. Build → Generate Signed Bundle/APK
4. Choose Android App Bundle (AAB)
5. Select release variant
6. Upload AAB to Play Console

---

## **Phase 5: Play Store Submission**

### Submission Checklist:
- [ ] AAB file uploaded
- [ ] App icon uploaded (512x512px)
- [ ] Feature graphic uploaded (1024x500px)
- [ ] 2+ screenshots uploaded
- [ ] Privacy Policy URL added
- [ ] Terms of Service URL added
- [ ] Content rating completed
- [ ] Target age set appropriately
- [ ] App category selected (Health & Fitness)
- [ ] Short description written (80 chars max)
- [ ] Full description written (4000 chars max)
- [ ] Contact information provided

### Review Process:
- **Initial Review:** 1-7 days (typically 1-3 days)
- **Status:** Check in Play Console
- **Common Issues:** 
  - Privacy policy must be accessible
  - Crisis disclaimers must be clear
  - Mental health claims must be educational only

---

## **Phase 6: Post-Launch**

### After Approval:
- [ ] Test production app from Play Store
- [ ] Share Play Store link with beta testers
- [ ] Monitor crash reports in Play Console
- [ ] Respond to user reviews
- [ ] Track download metrics

### Play Store URL Format:
```
https://play.google.com/store/apps/details?id=com.mindspace.app
```

---

## **Mobile-Specific Features Implemented**

### ✅ Completed:
1. **Capacitor Integration**
   - Android platform added
   - Native plugins installed
   - Config optimized for mobile

2. **Status Bar Customization**
   - Light text style
   - Green background (#8FEC78)
   - Matches brand colors

3. **Splash Screen**
   - 2-second display
   - Green background
   - Auto-hide after load

4. **App State Management**
   - Back button handler
   - App state tracking
   - Proper exit behavior

5. **Privacy Policy Page**
   - Mobile-specific privacy details
   - Required for Play Store
   - Accessible at /privacy

### 📋 To Add in Week 7-8:
- [ ] Offline mode for regulation tools
- [ ] Push notifications (optional)
- [ ] Haptic feedback for breathing exercises
- [ ] Dark mode support
- [ ] Tablet layout optimization

---

## **Testing Checklist**

### Before Submission:
- [ ] App installs successfully
- [ ] All navigation works
- [ ] Crisis tel: links open phone dialer
- [ ] Email signup stores in database
- [ ] Terms acceptance required
- [ ] Back button navigation correct
- [ ] No crashes on startup
- [ ] Splash screen displays properly
- [ ] Status bar styled correctly
- [ ] Privacy policy accessible
- [ ] App exits cleanly

### Performance:
- [ ] Load time < 3 seconds
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] Battery usage reasonable

---

## **Maintenance & Updates**

### Update Process:
1. Make changes to React code
2. Build: `yarn build`
3. Sync: `npx cap sync android`
4. Version bump in `android/app/build.gradle`
5. Generate new signed AAB
6. Upload to Play Console
7. Submit for review

### Version Numbering:
- Version 1.0.0: Initial release (Week 8)
- Version 1.1.0: Week 2 features (reflection module)
- Version 1.2.0: Week 3 features (regulation tools)
- Version 2.0.0: Major updates post-beta

---

## **Cost Summary**

- **Google Play Developer Account:** $25 (one-time)
- **App Icon Design:** $0 (DIY) or $50-200 (designer)
- **Domain (optional):** $10/year
- **Capacitor:** FREE
- **Android Studio:** FREE
- **Testing:** FREE (use your device or emulator)

**Total:** $25-250

---

## **Support & Resources**

### Documentation:
- Capacitor: https://capacitorjs.com/docs
- Google Play Console: https://play.google.com/console
- Android Studio: https://developer.android.com/studio

### Need Help?
- Ask during Week 7-8 implementation
- Test thoroughly before submission
- Review Google Play policies

---

## **Timeline Estimate**

**Week 7 (Development):**
- Day 1-2: Build app, test locally
- Day 3-4: Create app assets
- Day 5-7: Test on device, fix issues

**Week 8 (Submission):**
- Day 1-2: Set up Play Console, prepare listing
- Day 3: Generate signed AAB, submit
- Day 4-10: Wait for Google review
- Day 11+: Live on Play Store!

---

**🎉 Your MindSpace mobile app setup is ready for Week 7-8 implementation!**
