import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { carItemStyles } from "../styles";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Card from "./Card";

export default function BookCarItem({ car }) {
  const distance = 5;
  return (
    <Card>
      <Image source={car.image} style={carItemStyles.image} />
      <Text style={carItemStyles.title}>
        {car.brand} {car.model}
      </Text>

      <View style={carItemStyles.infoContainer}>
        <View style={carItemStyles.infoRow}>
          <FontAwesomeIcon name="money" size={20} color="#000"/>
          <Text style={carItemStyles.info}>${`${car.dailyPrice}`}/day</Text>
        </View>

        <View style={carItemStyles.infoRow}>
          <MaterialIcon
            name="airline-seat-recline-extra"
            size={20}
            color="#000"
          />
          <Text style={carItemStyles.info}>{`${car.seats}`}</Text>
        </View>

        <View style={carItemStyles.infoRow}>
          <MaterialIcon name="location-pin" size={20} color="#000" />
          <Text style={carItemStyles.info}>{`${distance}`}km away</Text>
        </View>
      </View>
    </Card>
  );
}
