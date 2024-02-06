import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import data from '../DummyData.json';
import CarItem from '../components/CarItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { fetchFlatDetails } from '../redux/flatlyApi';

import FlatItem from '../components/FlatItem';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const carBooking = useSelector(state=>state.carBooking);
  const flatBooking = useSelector(state=>state.flatBooking);

  // var carBooking = AsyncStorage.getItem('currentCarReservation');
  
  // carBooking = JSON.parse(carBooking);
  // console.log(carBooking)

  // var flatBooking = AsyncStorage.getItem('currentFlatReservation');
  // flatBooking = JSON.parse(carBooking);


  const userInfo = useSelector((state) => state.userInfo);


  const navigateToReservationScreen = () => {
    navigation.push('Selected Car', { car: carBooking.car, bookCar: false });
  };

  const navigateToFlatScreen = () => {
    dispatch(fetchFlatDetails( flatBooking.booking.flatId));
    navigation.push('Flat', { flatId: flatBooking.booking.flatId, title:flatBooking.flat.title, bookFlat:false });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`Hi, ${userInfo.firstname}!`}</Text>
      </View>
      {carBooking && carBooking.car && (
        <View>
          <Text>Your current Carly reservation is: </Text>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigateToReservationScreen}>
            <CarItem car={carBooking.car} date={new Date()} />
          </TouchableOpacity>
        </View>
      )}

      {flatBooking && (
        <View>
          <Text>Your current Flatly reservation is: </Text>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigateToFlatScreen}>
            <FlatItem flat={flatBooking} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
