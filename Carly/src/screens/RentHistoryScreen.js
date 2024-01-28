// PaymentsScreen.js
import React from 'react';
import {useState} from 'react';
import { FlatList, View, Text } from 'react-native';
import CarItem from '../components/CarItem';
import { fetchRentHistory } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';

function RentHistoryScreen() {

  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleGetRentHistory = async () => {
    try {
      await dispatch(fetchRentHistory());
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Please try again.');
      } else {
        console.log('Error during fetching rent history:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  handleGetRentHistory();
  const rentHistory = useSelector(state=>state.rentHistory);
 // console.log(rentHistory.map(item=>item.crDetails))

  const renderItem = ({ item }) => {
    return <Text>{item.carId}</Text>
    return (
      <CarItem
        id={item.info.id}
        name={`${item.info.brand} ${item.info.model}`}
        price={item.info.dailyPrice}
        photo={item.img}
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
