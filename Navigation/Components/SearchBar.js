import React, { useState } from 'react';
import { View, TextInput, Button,StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => onSearch(searchText);
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a user..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    searchInput: {
      flex: 1,
      marginRight: 10,
      padding: 8,
      borderWidth: 1,
      borderRadius: 5,
    },
    
  });
