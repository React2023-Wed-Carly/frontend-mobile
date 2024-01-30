import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card'; // Assuming that Card component is in the same directory
import { formatPrice } from '../utils/textFormatting';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCars, sendLikedCar, sendUnlikedCar } from '../redux/api';

export default function CarItem({ id, name, photo, price, date }) {
  const dispatch = useDispatch();

  const favoriteCars = useSelector((state) => state.favoriteCars);
  const isLiked = favoriteCars.find((item) => item.info.id === id) ? true : false;
  const [isFavorite, setIsFavorite] = useState(isLiked);

  const toggleFavorite = async () => {
    if (isFavorite) {
      dispatch(sendUnlikedCar(id));
    } else {
      dispatch(sendLikedCar(id));
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
              style={{ fontSize: 19, fontWeight: 'bold' }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            {price && (
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
                  {formatPrice(price)}
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
