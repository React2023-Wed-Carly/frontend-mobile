import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Card from './Card';
import { formatPrice } from '../utils/textFormatting';

function PaymentItem({ amount, date }) {
  const isTopUp = amount > 0;
  const amountStyle = { fontSize: 18, color: isTopUp ? 'green' : 'red' };
  const iconColor = 'grey';
  const dateParsed = new Date(date.split('.')[0]);
  const theme = useSelector((state) => state.theme);

  return (
    <Card>
      <View style={{ color: theme === 'light' ? '#222' : '#fff' }}>
        <Text style={amountStyle}>
          {!isTopUp && '-'}
          {formatPrice(amount)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="calendar-today" color={iconColor} size={12} />
        <Text style={{ color: iconColor, marginLeft: 5 }}>{dateParsed.toLocaleDateString()}</Text>
      </View>
    </Card>
  );
}

export default PaymentItem;
