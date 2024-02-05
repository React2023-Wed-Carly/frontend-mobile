import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import data from '../DummyData.json';
import CarItem from '../components/CarItem';
import FlatItem from '../components/FlatItem';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
  const reservation = useSelector(state=>state.currentCarBooking);
  const flat = useSelector(state=>state.currentFlatBooking);

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
          car={reservation.car}
          date={reservation.startDate}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center'}} onPress={navigateToFlatScreen}>
        <FlatItem flat={flat}/>
      </TouchableOpacity>
    </View>
  );
}
