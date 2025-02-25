import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card'; // Assuming that Card component is in the same directory
import { formatPrice } from '../utils/textFormatting';
import { useSelector } from 'react-redux';

export default function BookCarItem({ car, navigation }) {
  const currentLocation = useSelector((state) => state.currentLocation);
  const theme = useSelector((state) => state.theme);
  const unit = useSelector((state) => state.unit);

  const haversineDistance = (carLocation, currentLocation) => {
    const toRadians = (angle) => (angle * Math.PI) / 180;

    const dLat = toRadians(carLocation.latitude - currentLocation.latitude);
    const dLon = toRadians(carLocation.longitude - currentLocation.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(carLocation.latitude)) *
        Math.cos(toRadians(currentLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const radius = 6371;

    const distance = radius * c;

    return distance;
  };

  const distance = haversineDistance(
    { latitude: car.info.latitude, longitude: car.info.longitude },
    currentLocation
  );

  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          marginVertical: -3,
          marginLeft: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: `data:image/png;base64,${car.img}` }} // Assuming photo is a URL or local image path
            style={{
              width: 80,
              height: 80,
              borderRadius: 25,
              margin: -20,
              marginRight: 20,
              padding: 0,
            }}
          />

          <View style={{ width: '70%' }}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                color: theme === 'light' ? '#222' : '#fff',
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {car.info.brand} {car.info.model}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                padding: 2,
                paddingTop: 6,
                justifyContent: 'space-between',
                width: '70%',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon name="payments" color="gray" size={12} style={{ paddingTop: 3 }} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {`${formatPrice(car.info.dailyPrice)}`}
                  /day
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="airline-seat-recline-extra"
                  color="gray"
                  size={12}
                  style={{ paddingTop: 3 }}
                />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {`${car.info.seatingCapacity}`}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                padding: 2,
              }}
            >
              <Icon name="location-pin" color="gray" size={12} style={{ paddingTop: 3 }} />
              <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                {unit === 'meters' && `${(distance * 1000).toFixed(0)} m`}
                {unit === 'kilometers' && `${distance.toFixed(2)} km`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
