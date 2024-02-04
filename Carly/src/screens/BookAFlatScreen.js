import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles';
import { useSelector } from 'react-redux';

export default function BookAFlatScreen() {
  const theme = useSelector(state=>state.theme);
  return (
    <View style={{ backgroundColor: theme === 'light' ? '#222' : '#fff',}}>
      <Text>Book a Flat Screen</Text>
    </View>
  );
}
