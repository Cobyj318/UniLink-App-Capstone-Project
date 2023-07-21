# NewsCard Component

The `NewsCard` is a React Native component that represents a news card with a title, subtitle, cover image, and action buttons. It utilizes various components from `react-native-paper` to create the card layout and style.

## Props

The `NewsCard` component accepts the following prop:

- `user`: An object containing the news details with the following properties:
  - `Title`: The title of the news.
  - `Description`: The description or content of the news.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native-paper`: A library that provides components and theming for React Native apps.

## Custom Theme

The component uses a custom theme for the `PaperProvider` to customize the roundness and colors. The theme is defined in the `theme` object.

## LeftContent Component

The component defines a custom `LeftContent` component that displays an `Avatar.Icon` with a newspaper icon. This component is used in the `Card.Title` to render the icon on the left side of the card.

## Card Layout

The `NewsCard` component uses the `Card` component from `react-native-paper` to create the layout of the news card. It includes the following elements:

1. `Card.Title`:
   - Props:
     - `title`: The title of the news (from `user.Title`).
     - `subtitle`: The subtitle or description of the news (from `user.Description`).
     - `left`: Renders the `LeftContent` component.

2. `Card.Content`:
   - Children:
     - `Text` component with variant "titleLarge" to display the title of the news (from `user.Title`).
     - `Text` component with variant "bodyMedium" to display the description of the news (from `user.Description`).

3. `Card.Cover`:
   - Props:
     - `source`: The source of the cover image (using the `uri` of an image from "https://picsum.photos/700").

4. `Card.Actions`:
   - Children:
     - `Button` component with the text "Cancel".
     - `Button` component with the text "Ok".

## PaperProvider

The `NewsCard` component wraps the entire card inside the `PaperProvider` component with the custom theme to ensure consistent styling and theming across the app.

Note: This documentation provides an overview of the `NewsCard` component and its layout. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
