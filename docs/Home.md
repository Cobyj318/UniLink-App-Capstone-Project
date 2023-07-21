# HomeScreen Component

The `HomeScreen` is a React Native component responsible for displaying a home screen with sections for events, news, and clubs. It fetches data from Firebase and renders the information in horizontal scroll views.

## Props

The `HomeScreen` component does not accept any props.

## State

The component has the following state:

- `users` (array): Stores the fetched event data.
- `refreshing` (boolean): Represents the refreshing status of the ScrollView.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native`: A library for building mobile applications using React Native.
- `react-native-paper`: A library that provides components and theming for React Native apps.

## useEffect Hook

The `useEffect` hook is used to fetch the event data from Firebase when the component mounts. It calls the `fetchEventData` function, which internally uses the `fetchData` function from `../DBFunctions/FetchData` to fetch event data and updates the `users` state.

## Horizontal Scroll Views

The `HomeScreen` component contains three horizontal scroll views for events, news, and clubs. Each scroll view maps through the `users` array and renders a `HomeEventCard` component for each item. The `HomeEventCard` component receives the user data as a prop and displays the relevant information.

## Pull-to-Refresh with RefreshControl

The component implements pull-to-refresh functionality using the `RefreshControl` component from `react-native`. When users pull down the ScrollView, it triggers the `onRefresh` function from `../DBFunctions/RefreshFunctions`, which updates the `refreshing` state and refetches the event data.

## Styles

The component uses the `StyleSheet` object from `react-native` to define styles for the container, scrollView, card, and text. The design is set to display the cards in a horizontal layout with a maximum height of 400. Each card has a width of 300, a height of 400, and a margin of 4 for spacing.

Note: This documentation provides an overview of the `HomeScreen` component and its functionalities. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
