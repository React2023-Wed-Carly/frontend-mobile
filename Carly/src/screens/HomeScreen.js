import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import data from '../DummyData.json';
import CarItem from '../components/CarItem';
import FlatItem from '../components/FlatItem';

export default function HomeScreen({ navigation }) {
  const reservation = data.reservations[0];
  const car = data.cars.find((item) => item.id === reservation.carId);
  const flat = data.flat;

  const navigateToReservationScreen = () => {
    navigation.push('Selected Car', {car, reservation, bookCar: false});
  };

  const navigateToFlatScreen = () => {
    navigation.push('Flat',{flat});
  };

  if(!flat&&!car) return <Text>No reservations.</Text>

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Current reservations: </Text>
      <TouchableOpacity style={{ alignItems: 'center'}} onPress={navigateToReservationScreen}>
        <CarItem
          name={`${car.brand} ${car.model}`}
          price={car.dailyPrice}
          date={reservation.startDate}
          photo={car.photo}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center'}} onPress={navigateToFlatScreen}>
        <FlatItem flat={flat}/>
      </TouchableOpacity>
    </View>
  );
}
