import { View, Text, StyleSheet } from "react-native";
import { styles } from "../styles";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function MapScreen({ navigation }) {
    return <View style={styles.screenContainer}>
      <Text>Map Screen</Text>
    </View>
}

export default MapScreen;
