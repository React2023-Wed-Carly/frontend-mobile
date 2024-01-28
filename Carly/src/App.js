// App.js
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import BookACarScreen from './screens/BookACarScreen';
import BookAFlatScreen from './screens/BookAFlatScreen';
import AccountScreen from './screens/AccountScreen';
import RentHistoryScreen from './screens/RentHistoryScreen';
import FavoriteCarsScreen from './screens/FavoriteCarsScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import SettingsScreen from './screens/SettingsScreen';
import MapScreen from './screens/MapScreen';
import { styles } from './styles';
import SelectedCarScreen from './screens/SelectedCarScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { loginSuccess } from './redux/actions';
import { getPayments } from './redux/api';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Book a Car" component={BookACarScreen} />
      <Stack.Screen name="Selected Car" component={SelectedCarScreen} />
    </Stack.Navigator>
  );
}

function AuthStack({ updateLoginStatus }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        options={{ title: 'Login' }}
        children={(props) => <LoginScreen {...props} updateLoginStatus={updateLoginStatus} />}
      />
      <Stack.Screen
        name="Register"
        options={{ title: 'Register' }}
        children={(props) => <RegisterScreen {...props} updateLoginStatus={updateLoginStatus} />}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedApp({ handleLogout }) {
  return (
    <Drawer.Navigator drawerStyle={styles.drawerStyle}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Book a car" component={AppStack} />
      <Drawer.Screen name="Book a flat" component={BookAFlatScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Rent history" component={RentHistoryScreen} />
      <Drawer.Screen name="Favorite Cars" component={FavoriteCarsScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Settings">
        {(props) => <SettingsScreen {...props} onLogout={handleLogout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null && value === 'true') {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    const checkStoredUserInfo = async () => {
      try {
        const storedUserInfoString = await AsyncStorage.getItem('userInfo');

        if (storedUserInfoString) {
          const storedUserInfo = JSON.parse(storedUserInfoString);
          dispatch(loginSuccess(storedUserInfo));
        }
      } catch (error) {
        console.error('Error checking stored user info:', error);
      }
    };

    const getData = async () => {
      dispatch(getPayments);
    };

    const fetchData = async () => {
      // Use Promise.all to run both checks concurrently
      await Promise.all([checkLoginStatus(), checkStoredUserInfo()]);
      setLoading(false); // Set loading to false once both checks are completed
    };

    fetchData();
  }, [dispatch]);

  const updateLoginStatus = (status) => {
    setLoggedIn(status);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      updateLoginStatus(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      {loading ? (
        // Show a loading indicator here
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : isLoggedIn ? (
        <AuthenticatedApp updateLoginStatus={handleLogout} handleLogout={handleLogout} />
      ) : (
        <AuthStack updateLoginStatus={updateLoginStatus} />
      )}
    </NavigationContainer>
  );
}

export default App;
