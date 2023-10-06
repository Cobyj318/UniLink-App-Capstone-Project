import { StyleSheet } from "react-native";
import { primaryColors } from "../../../Components/Colors";
import { StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor:primaryColors.blue,
    },
    scrollView: {
      marginHorizontal: 10,
    },
    text: {
      fontSize: 42,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  