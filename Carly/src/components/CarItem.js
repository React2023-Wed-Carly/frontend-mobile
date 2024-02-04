import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card'; // Assuming that Card component is in the same directory
import { formatPrice } from '../utils/textFormatting';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCars, sendLikedCar, sendUnlikedCar } from '../redux/api';

export default function CarItem({ car, date, distance }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const favoriteCars = useSelector((state) => state.favoriteCars);
  const isLiked = favoriteCars?.find((item) => item.info.id === car.info.id) ? true : false;
  const [isFavorite, setIsFavorite] = useState(isLiked);

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
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/dummy_cars/car.png')} // Assuming photo is a URL or local image path
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
                <Icon name="payments" color="gray" size={12} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                  {formatPrice(car.info.dailyPrice)}
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
                <Icon name="calendar-today" color="gray" size={12} />
                <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>{date}</Text>
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
            <View style={{ flexDirection: 'row' }}>
              <Icon name="airline-seat-recline-extra" color="gray" size={12} />
              <Text style={{ fontSize: 12, color: 'gray', marginLeft: 5 }}>
                {`${car.info.seatingCapacity}`}
              </Text>
            </View>
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
