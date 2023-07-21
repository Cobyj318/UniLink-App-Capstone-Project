# EventsScreen Component

The `EventsScreen` is a React Native component responsible for displaying a list of event cards fetched from Firebase. It provides pull-to-refresh functionality and allows users to navigate to the `CreateEventScreen` to create new events.

## Props

The `EventsScreen` component accepts the following props:

- `navigation`: A navigation object provided by React Navigation to handle screen navigation.

## State

The component has the following state:

- `refreshing` (boolean): Represents the refreshing status of the ScrollView.
- `users` (array): Stores the fetched event data.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native`: A library for building mobile applications using React Native.
- `react-native-paper`: A library that provides components and theming for React Native apps.

## useEffect Hook

The `useEffect` hook is used to fetch the event data from Firebase when the component mounts. It calls the `fetchEventData` function, which internally uses the `fetchData` function from `../DBFunctions/FetchData` to fetch event data and updates the `users` state.

## Pull-to-Refresh with RefreshControl

The component implements pull-to-refresh functionality using the `RefreshControl` component from `react-native`. When users pull down the ScrollView, it triggers the `onRefresh` function from `../DBFunctions/RefreshFunctions`, which updates the `refreshing` state and refetches the event data.

## Custom Floating Action Button

The component defines a custom `FloatingButton` component, a floating action button rendered as an icon with a background color. When pressed, it navigates to the `CreateEventScreen` using the provided `navigation` prop.

## Theme Configuration

The `theme` object is used to configure the theme for the `PaperProvider`. It extends the `DefaultTheme` and customizes the colors for primary and accent to match the application's visual style.

## Styles

The component uses the `StyleSheet` object from `react-native` to define styles for the container, scrollView, text, backdrop, and the custom floating action button. This approach ensures consistent and maintainable styling.

Note: This documentation provides an overview of the `EventsScreen` component and its functionalities. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
