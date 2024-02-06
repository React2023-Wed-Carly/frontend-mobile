// PaymentsScreen.js
import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PaymentItem from '../components/PaymentItem';
import { getPayments } from '../redux/api';

function PaymentsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const payments = useSelector((state) => state.payments);
  const currentPage = useSelector((state) => state.paymentsPage);
  const pageEnd = useSelector((state) => state.paymentsPageEnd);
  const balance = useSelector((state) => state.balance);

  const renderItem = ({ item }) => (
    <PaymentItem amount={item.amount} date={item.date} type={item.type} />
  );

  useEffect(() => {
    dispatch(getPayments(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, balance]);

  const handleEndReached = () => {
    if (!pageEnd) dispatch(getPayments(currentPage));
  };

  return (
    <View style={{ padding: 10, backgroundColor: theme === 'light' ? '#fff' : '#222', flex: 1 }}>
      {!payments && <ActivityIndicator size="large" />}

      <FlatList
        data={payments || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

export default PaymentsScreen;
