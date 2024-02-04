// PaymentsScreen.js
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CarItem from '../components/CarItem';
import { fetchFavoriteCars, fetchRentHistory } from '../redux/api';

function RentHistoryScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const rentHistory = useSelector((state) => state.rentHistory);
  const favoriteCars = useSelector((state) => state.favoriteCars);

  if (!rentHistory) {
    dispatch(fetchRentHistory());
  }
  if (!favoriteCars) {
    dispatch(fetchFavoriteCars(0));
  }

  const renderItem = ({ item }) => {
    if (!item.car) return null;

    return <CarItem car={item.car} date={item.startDate} />;
  };

  return rentHistory && favoriteCars ? (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        color: theme === 'light' ? '#222' : '#fff',
        flex: 1,
      }}
    >
      <FlatList
        data={rentHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Failed to obtain rent history.</Text>
    </View>
  );
}

export default RentHistoryScreen;
