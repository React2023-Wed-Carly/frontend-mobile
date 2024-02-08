import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCars } from '../redux/api';
import CarItem from '../components/CarItem';

export default function FavoriteCarsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const favoriteCars = useSelector((state) => state.favoriteCars);
  const currentPage = useSelector((state) => state.favoriteCarsPage);
  const pageEnd = useSelector((state) => state.favoriteCarsPageEnd);

  useEffect(() => {
    // Fetch favorite cars when the component mounts or when currentPage changes
    if (!favoriteCars) {
      dispatch(fetchFavoriteCars(currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, favoriteCars]);

  const renderItem = ({ item }) => <CarItem car={item} />;

  const handleEndReached = () => {
    // Fetch the next page when reaching the end of the list
    if (!pageEnd) dispatch(fetchFavoriteCars(currentPage));
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
      {!favoriteCars && <ActivityIndicator size="large" />}

      <FlatList
        data={favoriteCars || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}
