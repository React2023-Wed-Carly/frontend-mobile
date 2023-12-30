import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentItem = ({ amount, date, type }) => {
  const isInternal = type === 'internal';
  const amountStyle = { fontSize: 18, color: isInternal ? 'green' : 'red' };
  const iconColor = 'grey';

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // You can change the currency as needed
  }).format(amount);

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginBottom: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text style={amountStyle}>
          {!isInternal && '-'}
          {formattedAmount}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name='calendar-today' color={iconColor} size={12} />
        <Text style={{ color: iconColor, marginLeft: 5 }}>{date}</Text>
      </View>
    </View>
  );
};

export default PaymentItem;
