import 'react-native-gesture-handler';
import * as React from 'react';
import { registerRootComponent } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import BookACarScreen from './screens/BookACarScreen';
import BookAFlatScreen from './screens/BookAFlatScreen';
import AccountScreen from './screens/AccountScreen';
import RentHistoryScreen from './screens/RentHistoryScreen';
import FavoriteCarsScreen from './screens/FavoriteCarsScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import SettingsScreen from './screens/SettinsScreen';
import MapScreen from './screens/MapScreen';
import { styles } from './styles';
import SelectedCarScreen from './screens/SelectedCarScreen';

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

function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Book a car"
				drawerStyle={styles.drawerStyle}
			>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Map" component={MapScreen} />
				<Drawer.Screen name="Book a car" component={AppStack} />
				<Drawer.Screen name="Book a flat" component={BookAFlatScreen} />
				<Drawer.Screen name="Account" component={AccountScreen} />
				<Drawer.Screen name="Rent history" component={RentHistoryScreen} />
				<Drawer.Screen name="Favorite Cars" component={FavoriteCarsScreen} />
				<Drawer.Screen name="Payments" component={PaymentsScreen} />
				<Drawer.Screen name="Settings" component={SettingsScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default registerRootComponent(App);
