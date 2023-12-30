// PaymentsScreen.js
import React from 'react';
import { FlatList, View } from 'react-native';
import CarItem from '../components/CarItem';
import data from '../DummyData.json';

const RentHistoryScreen = () => {
  const rentHistory = data.cars;
  const renderItem = ({ item }) => (
    <CarItem
      name={`${item.brand} ${item.model}`}
      price={item.dailyPrice}
      date='02/02/2023'
      photo={item.photo}
    />
  );

  return (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <FlatList
        data={rentHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RentHistoryScreen;
