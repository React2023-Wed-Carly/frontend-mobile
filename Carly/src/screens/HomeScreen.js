import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import data from '../DummyData.json';
import CarItem from '../components/CarItem';

import FlatItem from '../components/FlatItem';

export default function HomeScreen({ navigation }) {
  const reservation = data.reservations[0];
  const car = data.cars.find((item) => item.info.id === reservation.carId);
  const userInfo = useSelector((state) => state.userInfo);
  const flat = data.flat;

  const navigateToReservationScreen = () => {
    navigation.push('Selected Car', { car, reservation, bookCar: false });
  };

  const navigateToFlatScreen = () => {
    navigation.push('Flat', { flat });
  };

  if (!flat && !car) return <Text>No reservations.</Text>;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`Hi, ${userInfo.firstname}!`}</Text>
      </View>
      <Text>Your current Carly reservation is: </Text>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigateToReservationScreen}>
        <CarItem car={car} date={reservation.startDate} />
      </TouchableOpacity>
      <Text>Your current Flatly reservation is: </Text>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={navigateToFlatScreen}>
        <FlatItem flat={flat} />
      </TouchableOpacity>
    </View>
  );
}
