import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';
import { formatPrice } from '../utils/textFormatting';
import { useSelector } from 'react-redux';

export default function FlatItem({ flat }) {
  const theme = useSelector((state) => state.theme);
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          marginLeft: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {flat.thumbnail && (
            <Image
              source={{ uri: flat.thumbnail }} // Assuming photo is a URL or local image path
              style={{
                width: 80,
                height: 80,
                borderRadius: 25,
                margin: -20,
                marginRight: 20,
                padding: 0,
              }}
            />
          )}
          {flat.thumbnailUrl && (
            <Image
              source={{ uri: flat.thumbnailUrl }} // Assuming photo is a URL or local image path
              style={{
                width: 80,
                height: 80,
                borderRadius: 25,
                margin: -20,
                marginRight: 20,
                padding: 0,
              }}
            />
          )}
          <View style={{ width: '60%' }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: theme === 'light' ? '#222' : '#fff',
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {flat.title}, {flat.city}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                padding: 2,
                paddingTop: 6,
              }}
            >
              <Icon name="payments" color="gray" size={12} />
              {flat.totalPrice && (
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {formatPrice(flat.pricePerNight)}
                </Text>
              )}
              {flat.pricePerNight && (
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {formatPrice(flat.pricePerNight)}
                </Text>
              )}
            </View>

            {flat.startDate && (
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  padding: 2,
                }}
              >
                <Icon name="calendar-today" color="gray" size={12} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>{flat.startDate} - {flat.endDate}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
}
