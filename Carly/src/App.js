// App.js
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is logged in on app startup
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
        // Check if userInfo is stored in AsyncStorage
        const storedUserInfoString = await AsyncStorage.getItem('userInfo');

        if (storedUserInfoString) {
          // Parse the stored JSON string to an object
          const storedUserInfo = JSON.parse(storedUserInfoString);

          // Dispatch an action to set the user data in Redux state
          dispatch(loginSuccess(storedUserInfo));
        }
      } catch (error) {
        console.error('Error checking stored user info:', error);
      }
    };

    checkLoginStatus();
    checkStoredUserInfo();
  }, [dispatch]);

  const updateLoginStatus = (status) => {
    setLoggedIn(status);
  };

  const handleLogout = async () => {
    try {
      // Perform logout actions here (if any)

      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Additional actions after logout
      // ...

      // Update the login status
      updateLoginStatus(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AuthenticatedApp updateLoginStatus={handleLogout} handleLogout={handleLogout} />
      ) : (
        <AuthStack updateLoginStatus={updateLoginStatus} />
      )}
    </NavigationContainer>
  );
}

export default App;
