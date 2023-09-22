# Event Details Screen Explanation

This Markdown document explains the code in the `EventDetailsScreen.js` file.

## Code Overview

The `EventDetailsScreen` component is responsible for displaying event details and allowing users to edit those details if they are the event's creator.

### 1. Imports and Initial Setup

The necessary React Native and third-party components are imported. The `EventDetailsScreen` component uses state to manage the editing mode and edited event details.

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { CircularImage } from '../Components/CircleImage';
import { accentColors, primaryColors } from '../Components/Colors';
import RedLine from '../Components/RedLine';
import { FIREBASE_AUTH } from '../../src/firebase_init/firebase';
```
2. **State and Constants**

   - `editMode`: Manages whether the screen is in edit mode.
   - State variables (`editedTitle`, `editedDate`, `editedLocation`, `editedDescription`) hold the edited event details.
   - `screenHeight` calculates the device's screen height for responsive design.
   - `User_ID` retrieves the current user's ID from Firebase Authentication.

3. **Handle Edit Button**

   `handleEditButton` sets `editMode` to `true` if the current user is the event's creator.

4. **Handle Save Event**

   `handleSaveEvent` updates the event's data in Firebase with the edited details and displays a success message.

5. **Handle Save Button**

   `handleSaveButton` is responsible for saving the edited event details to Firebase or a state management system.

6. **Render UI**

   - The screen layout is structured within a `KeyboardAvoidingView` and a `ScrollView`.
   - Event header information is displayed in a blue header with a circular image and event details.
   - `RedLine` component separates header from event details.
   - The UI changes based on `editMode`.

     - In edit mode, input fields allow users to edit event details.
     - In view mode, event details are displayed with an "Edit" button for the event creator.

## Styles

The `styles` object contains CSS-like styling for the UI components, such as colors, fonts, padding, and margins. Notable styles include:
- `container`: Flex properties for container layout.
- `blueHeader`: Styling for the blue header containing the event's circular image and details.
- `textContainer`: Styling for the text container within the blue header.
- Input field styles (`input`, `input_multiline`) for edit mode.
- Typography styles (`eventTitle`, `eventDate`, `eventLocation`, `eventDescription`) for event details.

## Export

The `EventDetailsScreen` component is exported as the default export of the module, making it available for use in other parts of the application.

---

This Markdown document provides an overview of the `EventDetailsScreen.js` file, explaining its components, functionality, and styling.
```
