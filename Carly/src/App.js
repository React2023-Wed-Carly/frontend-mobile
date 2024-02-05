// App.js
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
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
import { changeTheme, flatlyLoginSuccess, loginSuccess } from './redux/actions';
import { logUserOut } from './redux/api';
import FlatScreen from './screens/FlatScreen';

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

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Selected Car" component={SelectedCarScreen} />
      <Stack.Screen name="Flat" component={FlatScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedApp({ handleLogout }) {
  const theme = useSelector((state) => state.theme);

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: theme === 'light' ? '#fff' : '#222',
      }}
    >
      <Drawer.Screen name="Home" component={HomeStack} />
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
  const theme = useSelector((state) => state.theme);

  const MyTheme = theme === 'light' ? DefaultTheme : DarkTheme;

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

    const checkFlatlyLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedInFlatly');
        if (value !== null && value === 'true') {
          dispatch(flatlyLoginSuccess());
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

    const fetchData = async () => {
      // Use Promise.all to run both checks concurrently
      await Promise.all([checkLoginStatus(), checkStoredUserInfo(), checkFlatlyLoginStatus()]);
      setLoading(false); // Set loading to false once both checks are completed
    };

    fetchData();
  }, [dispatch]);

  const updateLoginStatus = (status) => {
    setLoggedIn(status);
  };

  const handleLogout = async () => {
    try {
      dispatch(logUserOut());
      updateLoginStatus(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <NavigationContainer theme={MyTheme}>
      {loading ? (
        // Show a loading indicator here
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : isLoggedIn ? (
        <AuthenticatedApp updateLoginStatus={handleLogout} handleLogout={handleLogout} />
      ) : (
        <AuthStack theme={MyTheme} updateLoginStatus={updateLoginStatus} />
      )}
    </NavigationContainer>
  );
}

export default App;
