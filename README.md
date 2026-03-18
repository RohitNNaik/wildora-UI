Wildora Mobile (React Native)

Overview

Wildora Mobile is a React Native (Expo) scaffold implementing the client layer for a wildlife community app. It provides authentication, photo upload, a social feed, destinations/tours, recommendations and a user profile. The UI consumes backend endpoints:

- POST /upload-photo
- POST /create-post
- GET /feed
- GET /destinations
- GET /recommendations

**Architecture**

- **Entry point**: `App.js` — navigation, auth context and route definitions.
- **Screens**: Located in `src/screens/`:
	- `SignInScreen.js`, `SignUpScreen.js` — simple stubbed auth.
	- `FeedScreen.js` — loads feed from `GET /feed` and lists `PostCard` components.
	- `UploadPhotoScreen.js` — picks image via Expo ImagePicker and POSTS to `/upload-photo`.
	- `CreatePostScreen.js` — creates a text post via `/create-post`.
	- `DestinationsScreen.js` — lists `GET /destinations`.
	- `RecommendationsScreen.js` — lists `GET /recommendations`.
	- `ProfileScreen.js` — user info and sign-out.
- **API layer**: `src/api/index.js` — Axios client and wrapper functions (`uploadPhoto`, `createPost`, `getFeed`, `getDestinations`, `getRecommendations`).
- **Components**: `src/components/PostCard.js` — small presentational component for feed items.

File tree (top-level)

- App.js
- package.json
- .gitignore
- README.md
- src/
	- api/index.js
	- components/PostCard.js
	- screens/*.js

Dependencies

- Expo (SDK 48)
- React 18
- React Native 0.71.x (managed by Expo)
- axios for HTTP
- @react-navigation for navigation
- expo-image-picker for image selection

Environment

- Configure backend base URL with the `API_BASE_URL` environment variable. If not set, `src/api/index.js` uses a placeholder (`https://api.example.com`).

Quick start (macOS)

1. Install dependencies (only once):

```bash
cd /Users/rohitnaik/Desktop/Wildora/wildora-UI
npm install
```

2. (Optional) Set backend URL in your shell:

```bash
export API_BASE_URL="https://your.api.url"
```

3. Start the Expo dev server:

```bash
npm start
# or
npx expo start
```

4. Open the app

- iOS simulator: press `i` in the Metro terminal or run `npx expo run:ios` (macOS + Xcode required)
- Android emulator: press `a` in the Metro terminal or run `npx expo run:android` (Android Studio required)
- Physical device: open Expo Go and scan the Metro QR code

Running with a clean cache

```bash
npx expo start -c
```

Building standalone apps

- Use `eas build` (recommended) or Expo Classic build flows. See Expo docs for configuring `eas.json` and credentials.

Troubleshooting

- If you see compatibility warnings, run:

```bash
npx expo doctor
npx expo install react-native@0.71.14 react-native-screens@~3.20.0
```

- If Metro is stuck: stop it and restart with `npx expo start -c`.
- Permission dialogs: `UploadPhotoScreen` uses the image library; grant permissions when prompted.

Extending the app

- Replace stubbed auth in `SignInScreen.js` / `SignUpScreen.js` with real authentication and token storage.
- Add network error handling and loading states in each screen component.
- Add offline support / caching for the feed.

Developer notes

- To change the API base URL, update `src/api/index.js` or set `API_BASE_URL` in your environment.
- The current scaffold focuses on clear structure and minimal styling so you can integrate your backend and extend features quickly.

Contact

If you want, I can:
- Wire real authentication and token handling
- Add more robust UI/UX and styling
- Add tests or CI steps

Firebase Phone Auth (setup)

1. Create a Firebase project at https://console.firebase.google.com and enable "Phone" sign-in under Authentication -> Sign-in method.
2. Add your app to Firebase (Web app) and copy the config values. Place them into `src/firebase/config.js` or provide them via environment variables as noted in that file.
3. Install additional dependencies (already added in this scaffold): `firebase` and `expo-firebase-recaptcha`.
4. For Expo managed workflow, `expo-firebase-recaptcha` shows a reCAPTCHA modal for verification. On Android you may need to configure SHA-1 in Firebase console for phone auth to work properly.
5. Run the app and test phone sign-in from the `Sign In` screen -> `Sign in with phone`.

Security note: Do not commit your real Firebase credentials to the repository. Use environment variables or secret management for production.

# wildora-UI