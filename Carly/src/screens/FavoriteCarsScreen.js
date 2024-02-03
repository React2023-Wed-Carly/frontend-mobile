import { FlatList, View, Text } from 'react-native';
import { fetchFavoriteCars } from '../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CarItem from '../components/CarItem';

export default function FavoriteCarsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector(state=>state.theme)

  useEffect(() => {
    dispatch(fetchFavoriteCars());
  }, [dispatch]);

  const favoriteCars = useSelector(state=>state.favoriteCars);

  const renderItem = ({ item }) => (
      <CarItem
        car={item}
      />
    );

  return (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        color: theme==='light' ? '#222' : '#fff',
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