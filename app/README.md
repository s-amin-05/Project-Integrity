# React Native Template

This is a production-ready React Native CLI project template initialized with Vanilla JavaScript and the Static API for React Navigation.

## Prerequisites

- Node.js >= 18
- npm (configured as the package manager)
- React Native CLI
- Android Studio / Xcode

## Project Structure

The project follows a strict folder structure in `src/`:

```
src/
  ├── assets/
  ├── components/
  ├── hooks/
  ├── navigation/    # Navigation configuration (Static API)
  ├── screens/       # Screen components
  ├── services/
  └── utils/         # Constants and helpers
```

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **iOS Setup (Mac only):**
    ```bash
    npm run ios
    # Or manually:
    # cd ios && pod install && cd ..
    # npx pod-install ios
    ```

3.  **Run on Android:**
    ```bash
    npm run android
    ```

4.  **Run on iOS:**
    ```bash
    npm run ios
    ```

## Path Aliases

Absolute imports are configured using `@/` which maps to `src/`.
Example: `import { HomeScreen } from '@/screens/HomeScreen';`

## Navigation

Navigation is implemented using the **React Navigation Static API** (`createStaticNavigation`).
See `src/navigation/index.js` for the configuration.