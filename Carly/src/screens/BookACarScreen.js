import React, { useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Pressable,
  Button,
} from "react-native";
import jsonData from "../DummyData.json";
import { styles } from "../styles";
import BookCarItem from "../components/BookCarItem";
import FilterScreen from "./FilterScreen";
import MapScreen from "./MapScreen";

export default function BookACarScreen({ navigation }) {
  const cars = jsonData.cars;

  const [isFilter, setIsFilter] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCarList, setShowCarList] = useState(false);

  const toggleCarListView = () => {
    setShowCarList((prev) => !prev);
  };
  const applyFilters = () => {
    setIsFilter(false);
  };

  const openFilterScreen = () => {
    setIsFilter(true);
  };

  const handleCardPress = (car) => {
    navigation.push("Selected Car", { car });
  };

  return (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Button
        title={showCarList ? "Show Map" : "Show Car List"}
        onPress={toggleCarListView}
      />
      {showCarList && (
        <>
          {isFilter && (
            <FilterScreen
              applyFilters={applyFilters}
              setIsFilter={setIsFilter}
            />
          )}
          {!isFilter && (
            <View style={{ marginBottom: 40 }}>
              <TouchableOpacity
                style={bookStyles.filterButton}
                onPress={openFilterScreen}
              >
                <Text style={bookStyles.buttonText}>Filter</Text>
              </TouchableOpacity>

              <FlatList
                data={cars}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    key={item.id}
                    onPress={() => handleCardPress(item)}
                  >
                    <BookCarItem car={item} navigation={navigation} />
                  </Pressable>
                )}
              />
            </View>
          )}
        </>
      )}
      {!showCarList && (
        <MapScreen
          location={currentLocation}
          setLocation={setCurrentLocation}
        />
      )}
    </View>
  );
}

export const bookStyles = {
  filterButton: {
    backgroundColor: "#dcdcdc", // Light grey color
    padding: 10,
    borderRadius: 20, // More rounded edges
    marginVertical: 10,
    marginTop: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: "#ecf0f1",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  // Add other styles as needed
};
