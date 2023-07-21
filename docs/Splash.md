# SplashScreen Component

The `SplashScreen` is a React Native component that represents the initial splash screen of the application. It displays a background image (`BGImage`) and the LaTech logo (`Logo`) with app title, sign-up button, and existing user button. The component utilizes the `ImageBackground`, `View`, `Text`, `StyleSheet`, and `Image` components from React Native. It also uses the `Provider` and `Button` components from `react-native-paper` for theming and button styling.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native`: A library for building mobile applications using React Native.
- `react-native-paper`: A library that provides components and theming for React Native apps.

## Theme Configuration

The component uses a custom theme for the `PaperProvider` to customize the colors for primary and accent. The theme is defined in the `theme` object.

## UI Components

1. Background Image (`ImageBackground`):
   - Source: `BGImage`
   - Resize Mode: `'cover'`
   - Style: `styles.image`

2. Tint View (`View`):
   - Style: `styles.Tint`
   - Children:
     - LaTech Logo (`Image`): Source - `Logo`, Style - `styles.logo`
     - Top Menu View (`View`):
       - Style: `styles.TopMenu`
       - Children:
         - App Title (`Text`): Style - `styles.SplashscreenText`
         - Sign Up Button (`Button`):
           - OnPress: Navigate to `NewUserScreen`
           - Mode: `'contained'`
           - Style: `styles.Signup`
           - Button Color: `'#cb333b'`
         - Existing User Button (`Button`):
           - OnPress: Navigate to `MainContainer`
           - Mode: `'contained'`
           - Style: `styles.Existinguser`
           - Button Color: `'#cb333b'`

## Styles

The component uses the `StyleSheet` object from `react-native` to define the styles. It includes styles for the logo, image, existing user button, sign-up button, splash screen text, tint view, and top menu view.

Note: This documentation provides an overview of the `SplashScreen` component and its UI components. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
