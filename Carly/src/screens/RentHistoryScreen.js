// PaymentsScreen.js
import React from 'react';
import { useEffect} from 'react';
import { FlatList, View, Text } from 'react-native';
import CarItem from '../components/CarItem';
import { fetchFavoriteCars, fetchRentHistory} from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';

function RentHistoryScreen() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRentHistory());
    dispatch(fetchFavoriteCars());
  }, [dispatch]);

  const rentHistory = useSelector(state=>state.rentHistory);

  const renderItem = ({ item }) => {
    if(!item.car) return;

    return (
      <CarItem
        id={item.car.info.id}
        name={`${item.car.info.brand} ${item.car.info.model}`}
        price={item.car.info.dailyPrice}
        photo={item.car.info.img}
        date={item.startDate}
      />
    );
  };

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
}

export default RentHistoryScreen;
