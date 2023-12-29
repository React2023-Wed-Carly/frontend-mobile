import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles';

export default function BookCarItem({ car })  {
  return (
    <View style={styles.container}>
      <Image source={{ uri: car.photo }}/>
      <Text>{car.brand} {car.model}</Text>
      <Text>Cena: ${car.dailyPrice}</Text>
    </View>
  );
};
