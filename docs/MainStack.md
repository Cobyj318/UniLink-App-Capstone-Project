# MainStack Component

The `MainStack` is a React Native component that sets up the main navigation flow of the application. It consists of different navigation components, including the splash screen, new user screen, tab navigator, and stack navigators for various screens.

## Variable Names

The component defines several variable names for the screens:

- `OldUser`: Represents the main container for existing users, which is shown after authentication.
- `NewUser`: Represents the screen for new users to sign up and create an account.
- `Splash`: Represents the splash screen shown when the app is launched.
- `Cams`: Represents a screen named `CamScreen`.

## Event Stack Navigator

The component sets up an event stack navigator using `createStackNavigator`. This navigator handles the navigation for the "Events" tab. It consists of two screens: "InnerScreenA" and "CreateEventScreen". The "InnerScreenA" component is linked to `EventsScreen`, and the "CreateEventScreen" component is linked to `CreateEventScreen`.

## Bottom Tab Navigator

The component creates a bottom tab navigator using `createBottomTabNavigator`. This navigator is the main navigation hub for the app, and it contains the following screens:

1. "Home": Linked to the `HomeScreen` component.
2. "Events": Linked to the event stack navigator (`EventStack`) previously defined.
3. "News": Linked to the `NewsScreen` component.
4. "Message": Linked to the `MessageScreen` component.
5. "Profile": Linked to the `ProfileScreen` component.

The tab navigator sets custom options for the tab bar appearance, such as active and inactive tint colors, label style, and tab bar style.

## Main Stack Navigator

Finally, the component sets up the main stack navigator using `createStackNavigator`. This is the top-level navigator for the app, and it contains the following screens:

1. "Splash": Linked to the `SplashScreen` component, which is displayed when the app is launched.
2. "NewUser": Linked to the `NewUserScreen` component, where new users can sign up and create an account.
3. "OldUser": Linked to the `TabNavigator` component, which represents the main navigation for existing users after authentication.
4. "Cams": Linked to the `CamScreen` component.

## Navigation Structure

The overall navigation structure is as follows:

- Splash
  - NewUser
  - OldUser (Tab Navigator)
    - Home
    - Events (Event Stack Navigator)
      - InnerScreenA (EventsScreen)
      - CreateEventScreen
    - News
    - Message
    - Profile
- Cams

Note: This documentation provides an overview of the `MainStack` component and its navigation structure. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
