import BookCarItem from "../components/BookCarItem";
import { useState, useEffect } from "react";
import CarFilter from "../components/CarFilter";
import { Button, ScrollView, View, Text } from "react-native";
import jsonData from "../DummyData.json";
import { styles } from "../styles";
import SelectedCarScreen from "./SelectedCarScreen";

export default function BookACarScreen({ navigation }) {
  const cars = jsonData.cars;

  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    maxPrice: "",
  });
  const [isFilter, setIsFilter] = useState(false);

  const filterClick = (event) => {
    setIsFilter(true);
  };

  const filteredCars = cars.filter((car) => {
    return (
      car.brand.toLowerCase().includes(filter.brand.toLowerCase()) &&
      car.model.toLowerCase().includes(filter.model.toLowerCase()) &&
      (filter.maxPrice === "" || car.dailyPrice <= parseInt(filter.maxPrice))
    );
  });

  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        {isFilter && (
          <CarFilter
            filter={filter}
            setFilter={setFilter}
            setIsFilter={setIsFilter}
          />
        )}
        {!isFilter && <Button title="Filters" onPress={filterClick}></Button>}
        {!isFilter &&
          filteredCars.map((item) => (
            <BookCarItem car={item} navigation={navigation} />
          ))}
      </View>
    </ScrollView>
  );
}
