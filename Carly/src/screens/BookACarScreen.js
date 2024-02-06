import React, { useState, useEffect } from 'react';
import { FlatList, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import jsonData from '../DummyData.json';
import { styles } from '../styles';
import BookCarItem from '../components/BookCarItem';
import FilterScreen from './FilterScreen';
import MapScreen from './MapScreen';

export default function BookACarScreen({ navigation }) {
  const filteredCars = useSelector((state) => state.filteredCars);
  const theme = useSelector((state) => state.theme);
  const currentCarBooking = useSelector((state) => state.currentCarBooking);
  const [isFilter, setIsFilter] = useState(false);
  const [showCarList, setShowCarList] = useState(false);

  const isCarBooked = !!currentCarBooking;

  const toggleCarListView = () => {
    setShowCarList((prev) => !prev);
  };

  const openFilterScreen = () => {
    setIsFilter(true);
  };

  const handleCardPress = (car) => {
    navigation.push('Selected Car', { car, bookCar: true });
  };

  return (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        color: theme === 'light' ? '#222' : '#fff',
        flex: 1,
      }}
    >
      {isCarBooked && (
        <View style={{ justifyContent: 'center', flex: 1, alignContent: 'center', padding: 10 }}>
          <Icon
            name="confirmation-number"
            color="#cccc"
            size={50}
            style={{ marginVertical: 10, alignSelf: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>
            You have already booked a car. Cancel your reservation if you want to make another.
          </Text>
        </View>
      )}
      {!isCarBooked && showCarList && (
        <>
          {isFilter && <FilterScreen setIsFilter={setIsFilter} />}
          {!isFilter && (
            <View style={{ paddingBottom: 90, color: theme === 'light' ? '#222' : '#fff' }}>
              <TouchableOpacity style={bookStyles.filterButton} onPress={openFilterScreen}>
                <Text style={bookStyles.buttonText}>Filter</Text>
              </TouchableOpacity>

              <FlatList
                data={filteredCars}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable key={item.id} onPress={() => handleCardPress(item)}>
                    <BookCarItem car={item} navigation={navigation} distance={5} />
                  </Pressable>
                )}
              />
              <TouchableOpacity style={styles.activeButton} onPress={toggleCarListView}>
                <Text style={styles.buttonText}>{showCarList ? 'Show Map' : 'Show Car List'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {!isCarBooked && !showCarList && <MapScreen />}
      {!isCarBooked && !showCarList && (
        <TouchableOpacity style={styles.activeButton} onPress={toggleCarListView}>
          <Text style={styles.buttonText}>{showCarList ? 'Show Map' : 'Show Car List'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export const bookStyles = {
  filterButton: {
    backgroundColor: '#dcdcdc',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    marginTop: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: '#ecf0f1',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
};
