// PaymentsScreen.js
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PaymentItem from '../components/PaymentItem';
import { getPayments } from '../redux/api';

function PaymentsScreen() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const payments = useSelector((state) => state.payments);
  const renderItem = ({ item }) => (
    <PaymentItem amount={item.amount} date={item.date} type={item.type} />
  );

  if (!payments) dispatch(getPayments());

  return (
    <View style={{ padding: 10, color: theme === 'light' ? '#222' : '#fff', flex: 1 }}>
      <FlatList
        data={payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

export default PaymentsScreen;
