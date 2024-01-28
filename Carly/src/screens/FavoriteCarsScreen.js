import { FlatList, View, Text } from 'react-native';
import { fetchFavoriteCars } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CarItem from '../components/CarItem';

export default function FavoriteCarsScreen() {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleGetFavoriteCars = async () => {
    try {
      await dispatch(fetchFavoriteCars());
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Please try again.');
      } else {
        console.log('Error during fetching favorite cars:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  handleGetFavoriteCars();
  const favoriteCars = useSelector(state=>state.favoriteCars);

  const renderItem = ({ item }) => (
      <CarItem
        id = {item.info.id}
        name={`${item.info.brand} ${item.info.model}`}
        price={item.info.dailyPrice}
        photo={item.img}
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
        data={favoriteCars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}