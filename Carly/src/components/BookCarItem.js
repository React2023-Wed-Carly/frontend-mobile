import React from "react";
import { View, Image, Text, Button } from "react-native";
import { carItemStyles } from "../styles";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Card from "./Card";

export default function BookCarItem({ car, navigation }) {
  const handleSeeDetails = () => {
    // go to selected car
    navigation.navigate('Selected Car', { car: car })
  }
  const distance = 5;
  return (
      <Card>
        <View style={carItemStyles.titleContainer}>
          <Text style={carItemStyles.title}>
            {car.brand} {car.model}
          </Text>
          <Image
            source={require(`../../assets/dummy_cars/car.png`)}
            style={carItemStyles.image}
          />
        </View>
  
        <View style={carItemStyles.infoContainer}>
          <View style={carItemStyles.infoRow}>
            <FontAwesomeIcon name="money" color="gray" size={12} />
            <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
              ${`${car.dailyPrice}`}/day
            </Text>
          </View>
  
          <View style={carItemStyles.infoRow}>
            <MaterialIcon
              name="airline-seat-recline-extra"
              color="gray"
              size={12}
            />
            <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
              {`${car.seats}`}
            </Text>
          </View>
  
          <View style={carItemStyles.infoRow}>
            <MaterialIcon name="location-pin" color="gray" size={12} />
            <Text style={{ fontSize: 12, color: "gray", marginLeft: 5 }}>
              {`${distance}`}km away
            </Text>
          </View>
          <View style={carItemStyles.infoRow}>
            <Button title="See details" onPress={handleSeeDetails}></Button>
          </View>
        </View>

      </Card>
    );
}
