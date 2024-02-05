// PaymentsScreen.js
import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CarItem from '../components/CarItem';
import { fetchFavoriteCars, fetchRentHistory } from '../redux/api';

function RentHistoryScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const rentHistory = useSelector((state) => state.rentHistory);
  const rentHistoryCars = useSelector((state) => state.rentHistoryCars);
  const currentPage = useSelector((state) => state.rentHistoryPage);
  const pageEnd = useSelector((state) => state.rentHistoryPageEnd);

  useEffect(() => {
    // Fetch favorite cars when the component mounts or when currentPage changes
    if (!rentHistory) {
      dispatch(fetchRentHistory(currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rentHistory]);

  const renderItem = ({ item }) => {
    if (!rentHistoryCars || !item) return null;
    const car = rentHistoryCars.find((c) => c.info.id === item.carId);
    if (!car) return null;
    return <CarItem car={car} date={item.startDate} />;
  };

  const handleEndReached = () => {
    // Fetch the next page when reaching the end of the list
    if (!pageEnd) dispatch(fetchRentHistory(currentPage));
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
      {(!rentHistory || !rentHistoryCars) && <ActivityIndicator size="large" />}
      <FlatList
        data={rentHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

export default RentHistoryScreen;
