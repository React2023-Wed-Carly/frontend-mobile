// MapScreen.js

import React from "react";
import { StyleSheet, View } from "react-native";
//import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  // Replace with your initial region coordinates
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={initialRegion}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
