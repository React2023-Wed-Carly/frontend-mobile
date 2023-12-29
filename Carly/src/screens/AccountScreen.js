import { View, Text, StyleSheet } from 'react-native';
import { accountStyles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you have the MaterialIcons package installed
import userData from '../DummyData.json';


export default function AccountScreen() {
	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		availableFunds,
		distanceTraveled
	  } = userData.currentUser;

	  return (
		<View style={accountStyles.container}>
		  <Text style={accountStyles.headerText}>Account</Text>
	
		  <View style={accountStyles.userInfoContainer}>
        <Icon name="person" size={50} color="#000" />
        <View style={accountStyles.nameBalanceContainer}>
          <Text style={accountStyles.nameText}>
            {firstName} {lastName}
          </Text>
          <Text style={accountStyles.balanceText}>${availableFunds}</Text>
        </View>
      </View>
		  <View style={accountStyles.divider} />
	
		  <View style={accountStyles.userInfoContainer}>
			<Icon name="email" size={30} color="#000" />
			<Text style={accountStyles.userInfoText}>{email}</Text>
		  </View>
	
		  <View style={accountStyles.userInfoContainer}>
			<Icon name="phone" size={30} color="#000" />
			<Text style={accountStyles.userInfoText}>{phoneNumber}</Text>
		  </View>
	
		  <Text style={accountStyles.distanceText}>
			Distance travelled: {'\n'}{distanceTraveled} km
		  </Text>
		  <View style={accountStyles.divider} />
	
		  <Text style={accountStyles.actionText}>Delete account</Text>
		  <Text style={accountStyles.logoutText}>Log out</Text>
		</View>
	  );
	};
	
