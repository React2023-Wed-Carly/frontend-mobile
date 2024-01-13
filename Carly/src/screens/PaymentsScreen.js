// PaymentsScreen.js
import React from 'react';
import { FlatList, View } from 'react-native';
import PaymentItem from '../components/PaymentItem';
import data from '../DummyData.json';

function PaymentsScreen() {
  const { payments } = data.currentUser;
  const renderItem = ({ item }) => (
    <PaymentItem amount={item.amount} date={item.date} type={item.type} />
  );

  return (
    <View style={{ padding: 10, backgroundColor: 'white', flex: 1 }}>
      <FlatList
        data={payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

export default PaymentsScreen;
