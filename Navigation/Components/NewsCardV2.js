import React, { useState } from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const LeftContent = (props) => <Avatar.Icon {...props} icon="newspaper" />;

const NewsCardV2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handleExpand}>
      <PaperProvider theme={theme}>
        <Card style={styles.card}>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          {isExpanded && (
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
          )}
          {isExpanded && <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />}
          {isExpanded && (
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          )}
        </Card>
      </PaperProvider>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default NewsCardV2;
