import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';
import { formatPrice } from '../utils/textFormatting';

function PaymentItem({ amount, date, type }) {
  const isInternal = type === 'internal';
  const amountStyle = { fontSize: 18, color: isInternal ? 'green' : 'red' };
  const iconColor = 'grey';

  return (
    <Card>
      <View>
        <Text style={amountStyle}>
          {!isInternal && '-'}
          {formatPrice(amount)}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="calendar-today" color={iconColor} size={12} />
        <Text style={{ color: iconColor, marginLeft: 5 }}>{date}</Text>
      </View>
    </Card>
  );
}

export default PaymentItem;
