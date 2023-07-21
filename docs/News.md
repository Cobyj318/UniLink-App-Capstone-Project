# NewsScreen Component

The `NewsScreen` is a React Native component that represents a tab-based screen for displaying news content. It utilizes the `createMaterialTopTabNavigator` from `@react-navigation/material-top-tabs` to create two tabs: "LaTech" and "Sports." Each tab displays a different set of news cards.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native`: A library for building mobile applications using React Native.
- `@react-navigation/native`: A library for managing navigation in React Native apps.
- `@react-navigation/material-top-tabs`: A library that provides a top tab navigator for React Navigation.
- `@react-navigation/stack`: A library that provides a stack navigator for React Navigation.

## NewsDetailsScreen

This screen displays detailed news content. Currently, it renders a single `NewsCard` component inside a `ScrollView`. However, you can replace this with your own detailed news content as needed.

## LatechNewsScreen

This screen displays news related to Latech. It renders multiple `NewsCard` components inside a `ScrollView`. In the provided code, six `NewsCard` components are rendered, but you can add more or fetch the actual news data dynamically.

## SportsNewsScreen

This screen displays sports news. It renders multiple `NewsCardV2` components inside a `ScrollView`. Similar to `LatechNewsScreen`, six `NewsCardV2` components are rendered, but you can adjust the number of cards or fetch the actual sports news data as per your requirements.

## Stack Navigation

The component utilizes two stack navigators:

1. `LatechStack`: A stack navigator specific to the `LatechNewsScreen`. It is used to manage navigation between `LatechNewsScreen` and `NewsDetailsScreen`.

2. `Stack`: The main stack navigator for the component. It contains `LatechStackScreen`, which is the nested navigator for `LatechNewsScreen`, and manages navigation between different screens.

## Tab Navigation

The component utilizes a `Tab.Navigator` to create two tabs:

1. "LaTech" Tab: This tab displays the `LatechStackScreen`, which in turn renders the `LatechNewsScreen`. It allows users to view news related to Latech and navigate to the detailed news content.

2. "Sports" Tab: This tab displays the `SportsNewsScreen`, where users can view sports-related news.

## Styles

The component uses the `StyleSheet` object from `react-native` to define styles for the container, scrollView, and text. It sets the background color to white and adds horizontal margins to the `scrollView`.

Note: This documentation provides an overview of the `NewsScreen` component and its functionalities. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
