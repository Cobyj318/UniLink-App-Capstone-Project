# MessageScreen Component

The `MessageScreen` is a React Native component responsible for handling chat functionality within the Uni-Link app. It uses the Stream Chat API to enable users to communicate through chat channels.

## Dependencies

The component uses the following dependencies:

- `react-native`: The core React Native library for building user interfaces.
- `react-native-paper`: A library for UI components in React Native.
- `stream-chat-expo`: A library that provides chat-related functionality using Stream Chat in Expo apps.
- `react-native-safe-area-context`: A library to manage safe areas for React Native apps.

## SearchBar Component

The component defines a `SearchBar` functional component responsible for displaying a search input and button to search for users in the chat.

## Main Component

The main `MessageScreen` component is wrapped in the `SafeAreaProvider` and `OverlayProvider` components. It sets up the Stream Chat client and initializes the user with a given name and profile image. The chat channels are listed using the `ChannelList` component, which displays the available channels for the current user.

### State and Variables

- `isLoadingComplete`: A boolean state to determine if the app's resources are loaded.
- `isReady`: A boolean state to indicate if the chat is ready.
- `selectedChannel`: A state to keep track of the selected chat channel.
- `CurrentUser`: A constant representing the current user's name.
- `Profile_Image`: A constant representing the URL of the current user's profile image.
- `users`: A state to store the list of users fetched from the Stream Chat API.
- `userID`: A state to store the user ID (not in use).
- `searchResults`: A state to store the results of the user search.

### Fetching Users

The `fetchUsers` function fetches all users from the Stream Chat API using `client.queryUsers` and stores them in the `users` state.

### Handle Search

The `handleSearch` function handles user search based on the input provided in the search bar. It queries the Stream Chat API for users whose IDs match the search text and stores the results in the `searchResults` state.

### Channel Selection

When a user presses on a channel, the `onChannelPressed` function sets the selected channel using `setSelectedChannel`.

### User Selection

When a user presses on a user in the search results, the `onUserPressed` function creates a new chat channel between the current user and the selected user using the `client.channel` method. It then sets the selected channel to the newly created channel using `setSelectedChannel`.

### Conditional Rendering

The component conditionally renders the chat UI and the search results UI based on the presence of a selected channel. If a channel is selected, it displays the chat messages using `MessageList` and allows the user to input messages using `MessageInput`. If no channel is selected, it displays the list of channels using `ChannelList`.

The search results are displayed below the main chat UI when there are search results to show. It uses a `FlatList` to display the search results.

## Styles

The component defines a set of styles using `StyleSheet.create` to control the layout and appearance of various UI elements.

Note: This documentation provides an overview of the `MessageScreen` component and its functionalities. For a comprehensive understanding and code implementation details, it is recommended to refer to the actual code.
