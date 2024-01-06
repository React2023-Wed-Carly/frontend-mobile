import React from "react";
import { View, Text, Button, Image } from "react-native";
import { selectedCarStyles } from "../styles";
import carData from "../DummyData.json";
import Card from "../components/Card";

const SelectedCarScreen = () => {
  const {
    id,
    owner,
    photo,
    brand,
    model,
    year,
    description,
    dailyPrice,
    location,
    seats,
  } = carData.cars[0];
  console.log(owner);

  const handleBookCar = () => {
    // book a car logic
  };

  return (
    <Card>
      <View style={selectedCarStyles.container}>
        <Image
          source={require(`../../assets/dummy_cars/car.png`)} // Zastąp adresem URL faktycznym adresem obrazu samochodu
          style={selectedCarStyles.carImage}
        />
        <View style={selectedCarStyles.carInfo}>
          <Text style={selectedCarStyles.carName}>
            {brand} {model}
          </Text>
          <Text style={selectedCarStyles.carYear}>{year}</Text>
        </View>
        <Button
          style={selectedCarStyles.button}
          title="Book a car"
          onPress={handleBookCar}
        ></Button>
      </View>
    </Card>
  );
};

export default SelectedCarScreen;
