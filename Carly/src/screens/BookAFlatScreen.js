import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { styles } from '../styles';
import FlatlyLogin from '../components/FlatlyLogin';
import { fetchFlats, fetchFlatDetails, fetchFlatBooking } from '../redux/flatlyApi';
import FlatItem from '../components/FlatItem';

export default function BookAFlatScreen({ navigation }) {
  const theme = useSelector((state) => state.theme);
  const flats = useSelector((state) => state.flats);
  const id = useSelector((state) => state.userInfo.id);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.flatlyData.isLoggedIn);
  const currentFlatBooking = useSelector((state) => state.currentFlatBooking);
  const [showLogin, setShowLogin] = useState(false);

  const isFlatBooked = !!currentFlatBooking;

  const handleFlatPress = async ({ flatId, title }) => {
    await dispatch(fetchFlatDetails(flatId));
    navigation.push('Flat', { flatId, flatTitle: title, bookFlat: true });
  };

  useEffect(() => {
    dispatch(fetchFlats());
    //dispatch(fetchFlatBooking(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, showLogin]);

  useEffect(() => {
    if (!isFlatBooked && isLoggedIn && !flats) dispatch(fetchFlats());
  }, [isLoggedIn, flats, isFlatBooked, dispatch]);

  return (
    <View style={{ flex: 1 }}>
      {isFlatBooked && (
        <View style={{ justifyContent: 'center', flex: 1, alignContent: 'center', padding: 10 }}>
          <Icon
            name="confirmation-number"
            color="#cccc"
            size={50}
            style={{ marginVertical: 10, alignSelf: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>
            You have already booked a flat. Cancel your current reservation if you want to make
            another.
          </Text>
        </View>
      )}
      {!isFlatBooked && !isLoggedIn && showLogin && (
        <FlatlyLogin hideLogin={() => setShowLogin(false)} />
      )}
      {!isFlatBooked && !isLoggedIn && !showLogin && (
        <View style={{ flex: 1, justifyContent: 'center', margin: 10, alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', padding: 10 }}>
            It seems like you have not linked your Flatly account yet. Login or register to book
            flats!
          </Text>
          <TouchableOpacity style={styles.activeButton} onPress={() => setShowLogin(true)}>
            <Text style={styles.buttonText}>Go to Flatly login</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isFlatBooked && isLoggedIn && (
        <View
          style={{ padding: 20, paddingBottom: 90, color: theme === 'light' ? '#222' : '#fff' }}
        >
          <FlatList
            data={flats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                onPress={() => handleFlatPress({ flatId: item.id, title: item.title })}
              >
                <FlatItem flat={item} navigation={navigation} />
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
