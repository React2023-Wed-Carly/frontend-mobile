import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { styles } from '../styles';
import FlatlyLogin from '../components/FlatlyLogin';

export default function BookAFlatScreen() {
  const theme = useSelector((state) => state.theme);
  const isLoggedIn = useSelector((state) => state.flatlyData.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);
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
        <View style={{ flex: 1, justifyContent: 'center', margin: 10, alignItems: 'center' }}>
          <Text>Flat list!</Text>
        </View>
      )}
    </View>
  );
}
