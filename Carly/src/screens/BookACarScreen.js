import BookCarItem from "../components/BookCarItem";
import { useState, useEffect } from "react";
import CarFilter from "../components/CarFilter";
import { Button, ScrollView, View, Text } from "react-native";
import jsonData from "../DummyData.json";
import { styles } from "../styles";
import MapScreen from "./MapScreen";

export default function BookACarScreen({ navigation }) {
  const cars = jsonData.cars;

  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    maxPrice: "",
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [maxDistance, setMaxDistance] = useState(10);
  const [showCarList, setShowCarList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const toggleCarListView = () => {
    setShowCarList((prev) => !prev);
  };
  const toggleFilterView = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <>
      <Button
        title={showCarList ? "Show Map" : "Show Car List"}
        onPress={toggleCarListView}
      />
      {showCarList && (
        <ScrollView>
          <View style={styles.screenContainer}>
            {showFilter && (
              <CarFilter
                filter={filter}
                setFilter={setFilter}
                setIsFilter={setShowFilter}
              />
            )}
            {!showFilter && (
              <Button title="Filters" onPress={toggleFilterView}></Button>
            )}
            {!showFilter &&
              cars.map((item) => (
                <BookCarItem key={item.id} car={item} navigation={navigation} />
              ))}
          </View>
        </ScrollView>
      )}
      {!showCarList && (
        <MapScreen
          location={currentLocation}
          setLocation={setCurrentLocation}
        />
      )}
    </>
  );
}
