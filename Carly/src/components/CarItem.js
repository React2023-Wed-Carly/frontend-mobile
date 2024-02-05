import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card'; // Assuming that Card component is in the same directory
import { formatPrice } from '../utils/textFormatting';

import { fetchFavoriteCars, sendLikedCar, sendUnlikedCar } from '../redux/api';

export default function CarItem({ car, date, distance }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [isFavorite, setIsFavorite] = useState(car.isFavorite);

  const toggleFavorite = async () => {
    if (isFavorite) {
      dispatch(sendUnlikedCar(car.info.id));
    } else {
      dispatch(sendLikedCar(car.info.id));
    }
    setIsFavorite((prev) => !prev);
  };

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
              {car.info.brand} {car.info.model}
            </Text>
            {car.info.dailyPrice && (
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  padding: 2,
                  paddingTop: 6,
                }}
              >
                <Icon name="payments" color="gray" size={12} style={{ marginTop: 2 }} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {formatPrice(car.info.dailyPrice)}
                </Text>
              </View>
            )}
            {!date && (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="airline-seat-recline-extra"
                  color="gray"
                  size={12}
                  style={{ marginTop: 2 }}
                />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {`${car.info.seatingCapacity}`}
                </Text>
              </View>
            )}
            {date && (
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  padding: 2,
                }}
              >
                <Icon name="calendar-today" color="gray" size={12} style={{ marginTop: 2 }} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {new Date(date.split('.')[0]).toLocaleDateString()}
                </Text>
              </View>
            )}

            {distance && (
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  padding: 2,
                }}
              >
                <Icon name="location-pin" color="gray" size={12} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {distance} km away
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <Pressable onPress={toggleFavorite}>
            {isFavorite ? (
              <Icon name="star" color="gold" size={30} />
            ) : (
              <Icon name="star-border" color="gray" size={30} />
            )}
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
