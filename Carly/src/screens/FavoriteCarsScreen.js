import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCars } from '../redux/api';
import CarItem from '../components/CarItem';

export default function FavoriteCarsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const favoriteCars = useSelector((state) => state.favoriteCars);

  if (!favoriteCars) dispatch(fetchFavoriteCars());

  const renderItem = ({ item }) => <CarItem car={item} />;

  return (
    <View
      style={{
        padding: 20,
        paddingHorizontal: 20,
        color: theme === 'light' ? '#222' : '#fff',
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
