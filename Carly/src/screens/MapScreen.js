// MapScreen.js

import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import jsonData from "../DummyData.json";

const MapScreen = () => {
  // Replace with your initial region coordinates
  // const initialRegion = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };
  const cars = jsonData.cars;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [unit, setUnit] = useState("km");
  const [maxDistance, setMaxDistance] = useState(10);
  const [carsInRadius, setCarsInRadius] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  const getCarsInRadius = () => {
    if (!currentLocation) {
      return;
    }
    const radius = unit === "km" ? 6371 : 6371000;

    const filteredCars = cars.filter((car) => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        car.location.latitude,
        car.location.longitude,
        radius
      );
      return distance <= maxDistance;
    });

    setCarsInRadius(filteredCars);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2,radius) => {
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c; // Odległość w km
    return distance;
  };
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Max distance (${unit})`}
          keyboardType="numeric"
          onChangeText={(text) => setMaxDistance(text)}
        />
        <Button title="Search" onPress={getCarsInRadius} />
      </View>

      <Picker
        selectedValue={unit}
        onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
      >
        <Picker.Item label="meters" value="m" />
        <Picker.Item label="kilometers" value="km" />
      </Picker>

      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
          {carsInRadius.map((vehicle) => (
            <Marker
              key={vehicle.id}
              coordinate={{
                latitude: vehicle.location.latitude,
                longitude: vehicle.location.longitude,
              }}
              title="marker"
            />
          ))}
        </MapView>
      )}
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 8,
  },
  unitButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default MapScreen;
