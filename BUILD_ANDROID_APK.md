# Build MindSpace Android APK - Quick Start Guide

## Your Project is Ready!

The MindSpace Android project has been configured and is ready to build. Here's what's already done:

| Item | Status |
|------|--------|
| React app built | Done |
| Capacitor configured | Done |
| Android project created | Done |
| Web assets synced | Done |
| App ID: com.mindspace.app | Done |

---

## Build the APK (3 Simple Steps)

### Step 1: Get the Code to Your Computer

**Option A: Save to GitHub (Recommended)**
1. In Emergent chat, click "Save to Github"
2. Clone to your computer:
   ```bash
   git clone <your-github-url>
   cd <your-project>/frontend
   ```

**Option B: Download ZIP**
1. Download the project from Emergent
2. Extract and open the `frontend` folder

### Step 2: Install Android Studio

1. Download from: https://developer.android.com/studio
2. Install and complete the setup wizard
3. Accept all SDK licenses when prompted

### Step 3: Build the APK

Open terminal in the `frontend` folder:

```bash
# Install dependencies (if not done)
yarn install

# Open project in Android Studio
npx cap open android
```

In Android Studio:
1. Wait for Gradle sync to complete (may take a few minutes first time)
2. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Click "locate" when build finishes
4. Your APK is at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Test the APK

**On Android Phone:**
1. Transfer the APK to your phone
2. Enable "Install from unknown sources" if prompted
3. Tap the APK to install
4. Test all features work

**On Emulator:**
1. In Android Studio, click the green "Run" button
2. Select or create an emulator
3. App will launch automatically

---

## Prepare for Google Play Store

### 1. Create Signed Release APK

For Play Store, you need a **signed** APK. In Android Studio:

1. **Build** → **Generate Signed Bundle / APK**
2. Choose **APK**
3. Create new keystore (first time only):
   - Path: `frontend/android/mindspace.keystore`
   - Password: (choose a strong password - SAVE THIS!)
   - Alias: mindspace
   - Validity: 25+ years
4. Select **release** build variant
5. Click **Finish**

Your signed APK: `android/app/release/app-release.apk`

### 2. Google Play Developer Account

1. Go to: https://play.google.com/console
2. Pay $25 one-time fee
3. Complete verification

### 3. Create App Listing

In Play Console:
1. **Create app** → Enter details
2. Upload your signed APK
3. Fill in store listing:
   - App name: MindSpace
   - Short description: Trauma-informed self-reflection tool
   - Category: Health & Fitness
4. Add screenshots (take from your device)
5. Add Privacy Policy URL
6. Submit for review

---

## Important Files

| File | Purpose |
|------|---------|
| `capacitor.config.json` | App settings |
| `android/app/build.gradle` | Build config |
| `android/app/src/main/res/` | App icons/splash |

---

## Custom App Icon

To replace the default icon:
1. Generate icons at: https://romannurik.github.io/AndroidAssetStudio/
2. Download the zip
3. Replace files in `android/app/src/main/res/mipmap-*/`

---

## Troubleshooting

**Gradle sync failed:**
- Check internet connection
- File → Invalidate Caches → Restart

**SDK not found:**
- Open Android Studio SDK Manager
- Install "Android SDK Build-Tools"

**APK won't install:**
- Enable "Unknown sources" in phone settings
- Uninstall any previous version first

---

## Questions?

The app is configured and ready. You just need Android Studio on your computer to build the APK. This cannot be done on the web server - it requires local development tools.
