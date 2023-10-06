import { StyleSheet } from "react-native";
import { primaryColors } from "../../../Components/Colors";

export const cardstyles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: primaryColors.blue,
},
tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next row
    alignItems: 'center', // Align items in the center
    marginTop: 10,
    marginBottom: 10,
},
projectCardContainer: {
    flex: 1,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
},
projectCard: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
},
cardImage: {
    width: '100%',
    height: 150,
},
cardContent: {
    padding: 8,
},
title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
},
subtitle: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
},
description: {
    fontSize: 14,
    marginBottom: 8,
},
pressable: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
},
viewDetails: {
    color: 'white',
},
cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
},
flatListContainer: {
    flexGrow: 1,
},
});