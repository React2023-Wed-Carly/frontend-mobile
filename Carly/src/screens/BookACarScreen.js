import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import jsonData from '../DummyData.json';
import { styles } from '../styles';
import CarItem from '../components/CarItem';
import FilterScreen from './FilterScreen';
import MapScreen from './MapScreen';

export default function BookACarScreen({ navigation }) {
  const { cars } = jsonData;
  const theme = useSelector((state) => state.theme);

  const [isFilter, setIsFilter] = useState(false);
  const [showCarList, setShowCarList] = useState(false);

  const toggleCarListView = () => {
    setShowCarList((prev) => !prev);
  };
  const applyFilters = () => {
    setIsFilter(false);
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
      {showCarList && (
        <>
          {isFilter && <FilterScreen applyFilters={applyFilters} setIsFilter={setIsFilter} />}
          {!isFilter && (
            <View style={{ paddingBottom: 90, color: theme === 'light' ? '#222' : '#fff' }}>
              <TouchableOpacity style={bookStyles.filterButton} onPress={openFilterScreen}>
                <Text style={bookStyles.buttonText}>Filter</Text>
              </TouchableOpacity>

              <FlatList
                data={cars}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable key={item.id} onPress={() => handleCardPress(item)}>
                    <CarItem car={item} navigation={navigation} distance={5} />
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
      {!showCarList && (
        <>
          <MapScreen />
          <TouchableOpacity style={styles.activeButton} onPress={toggleCarListView}>
            <Text style={styles.buttonText}>{showCarList ? 'Show Map' : 'Show Car List'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export const bookStyles = {
  filterButton: {
    backgroundColor: '#dcdcdc', // Light grey color
    padding: 10,
    borderRadius: 20, // More rounded edges
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
  // Add other styles as needed
};
