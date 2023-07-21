# EventCard Component

The `EventCard` is a React Native component that represents an event card with details such as sponsor, date, title, description, cover image, and action buttons. It utilizes various components from `react-native-paper` to create the card layout and style.

## Props

The `EventCard` component accepts the following prop:

- `users`: An array of objects, each containing the event details with the following properties:
  - `Sponser`: The sponsor of the event.
  - `Date`: The date of the event.
  - `Title`: The title of the event.
  - `Description`: The description or content of the event.
  - `id`: The unique identifier of the event.

## Dependencies

This component uses the following external libraries:

- `react`: The core React library for building user interfaces.
- `react-native-paper`: A library that provides components and theming for React Native apps.
- `firebase/firestore`: A module for working with Firebase Firestore database.
- `../../src/firebase_init/firebase`: The Firebase configuration and initialization.

## Custom Theme

The component uses a custom theme for the `PaperProvider` to customize the roundness and colors. The theme is defined in the `theme` object.

## LeftContent Component

The component defines a custom `LeftContent` component that displays an `Avatar.Icon` with a circle icon. This component is used in the `Card.Title` to render the icon on the left side of the card.

## Card Layout

The `EventCard` component uses the `Card` component from `react-native-paper` to create the layout of the event card. It includes the following elements:

1. `Card.Title`:
   - Props:
     - `title`: The sponsor of the event (from `user.Sponser`).
     - `subtitle`: The date of the event (from `user.Date`).
     - `left`: Renders the `LeftContent` component.

2. `Card.Content`:
   - Children:
     - If `editMode` is `true` (indicating the user is in edit mode), display two `TextInput` components for editing the title and description.
     - If `editMode` is `false`, display two `Text` components with variant "titleLarge" and "bodyMedium" to show the title and description.

3. `Card.Cover`:
   - Props:
     - `source`: The source of the cover image (using the `uri` of an image from "https://picsum.photos/700").

4. `Card.Actions`:
   - Children:
     - If `editMode` is `false`, display a `Button` component with the text "RSVP" that triggers an alert when pressed.
     - If `editMode` is `true`, display two `Button` components with the text "Save" and "Cancel" for saving or canceling the edit mode.
     - If `editMode` is `false`, display a `Button` component with the text "Edit" that sets the `editMode` to `true`.
     - If `editMode` is `false`, display a `Button` component with the text "Delete" that triggers an alert for event deletion.

## PaperProvider

The `EventCard` component wraps the entire card inside the `PaperProvider` component with the custom theme to ensure consistent styling and theming across the app.

Note: This documentation provides an overview of the `EventCard` component and its layout. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
