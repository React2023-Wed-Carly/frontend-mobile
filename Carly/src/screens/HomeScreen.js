import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import data from '../DummyData.json';
import CarItem from '../components/CarItem';
import { fetchRentHistory } from '../redux/api';
import { fetchFlatDetails, fetchFlatBooking } from '../redux/flatlyApi';

import FlatItem from '../components/FlatItem';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userInfo.id);
  const theme = useSelector((state) => state.theme);

  const carBooking = useSelector((state) => state.currentCarBooking);
  const flatBooking = useSelector((state) => state.currentFlatBooking);
  const rentHistory = useSelector((state) => state.rentHistory);
  const rentHistoryCars = useSelector((state) => state.rentHistoryCars);

  const [isFlat, setIsFlat] = useState(flatBooking !== null);
  const [isCar, setIsCar] = useState(carBooking !== null);

  useEffect(() => {
    if (carBooking) setIsCar(true);
    if (flatBooking) setIsFlat(true);
    if (!carBooking) setIsCar(false);
    if (!flatBooking) setIsFlat(false);

    if (!rentHistory||!rentHistoryCars) {
      dispatch(fetchRentHistory(0));
      dispatch(fetchFlatBooking(id));
    }
  }, [carBooking, flatBooking, dispatch, rentHistory, rentHistoryCars]);

  const userInfo = useSelector((state) => state.userInfo);

  const navigateToReservationScreen = () => {
    navigation.push('Selected Car', { car: carBooking.car, bookCar: false });
  };

  const navigateToFlatScreen = () => {
    dispatch(fetchFlatDetails(flatBooking.booking.flatId));
    navigation.push('Flat', {
      flatId: flatBooking.booking.flatId,
      title: flatBooking.flat.title,
      bookFlat: false,
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>

      {(!rentHistory||!rentHistoryCars) && <ActivityIndicator size="large" />}
      {(rentHistoryCars&&rentHistory) && (
        <>
          <View style={{ paddingVertical: 10, paddingTop: 0 }}>
            <Text
          style={{ fontSize: 20, fontWeight: 'bold', color: theme === 'light' ? '#222' : '#fff' }}
        >{`Hi, ${userInfo.firstname}!`}</Text>
          </View>

          {carBooking && carBooking.car && (
            <View>
              <Text style={{ color: theme === 'light' ? '#222' : '#fff' }}>
            Your current Carly reservation is:{' '}
          </Text>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={navigateToReservationScreen}
              >
                <CarItem car={carBooking.car} date={carBooking.booking.startDate} />
              </TouchableOpacity>
            </View>
          )}
        </>

      )}

      {flatBooking && (
        <View>
          <Text style={{ color: theme === 'light' ? '#222' : '#fff' }}>
            Your current Flatly reservation is:{' '}
          </Text>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigateToFlatScreen}>
            <FlatItem flat={flatBooking} />
          </TouchableOpacity>
        </View>
      )}

      {!carBooking && !flatBooking && (
        <View style={{ justifyContent: 'center', flex: 1, alignContent: 'center', padding: 10 }}>
          <Icon
            name="confirmation-number"
            color="#cccc"
            size={50}
            style={{ marginVertical: 10, alignSelf: 'center' }}
          />
          <Text style={{ textAlign: 'center', color: theme === 'light' ? '#222' : '#fff' }}>
            It seems like you do not currently have any bookings. Check out our cars and flats!
          </Text>
        </View>
      )}
    </View>
  );
}
