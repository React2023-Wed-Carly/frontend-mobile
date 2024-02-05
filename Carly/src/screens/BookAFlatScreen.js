import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button,Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { styles } from '../styles';
import FlatlyLogin from '../components/FlatlyLogin';
import { fetchFlats, fetchFlatDetails } from '../redux/flatlyApi';
import FlatItem from '../components/FlatItem';

export default function BookAFlatScreen({navigation}) {
  const theme = useSelector((state) => state.theme);
  const flats = useSelector(state=>state.flats);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.flatlyData.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);

  const handleFlatPress = async ({id, title}) => {
    await dispatch(fetchFlatDetails(id));
    navigation.push('Flat', { flatId: id, flatTitle:title, bookFlat:true });
  }


  return (
    <View style={{ backgroundColor: theme === 'dark' ? '#222' : '#fff', flex: 1 }}>
      {!isLoggedIn && showLogin && <FlatlyLogin hideLogin={() => setShowLogin(false)} />}
      {!isLoggedIn && !showLogin && (
        <View style={{ flex: 1, justifyContent: 'center', margin: 10, alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', padding: 10 }}>
            It seems like you have not linked your Flatly account yet. Login or register to book
            flats!
          </Text>
          <TouchableOpacity style={styles.activeButton} onPress={() => setShowLogin(true)}>
            <Text style={styles.buttonText}>Flatly login</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoggedIn && (
        <View style={{ paddingBottom: 90, color: theme === 'light' ? '#222' : '#fff' }}>
          <Button onPress={()=>{dispatch(fetchFlats())}} title="Get flats"></Button>
          <FlatList
            data={flats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable key={item.id} onPress={() => handleFlatPress({id: item.id, title:item.title})}>
                <FlatItem flat={item} navigation={navigation} />
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
