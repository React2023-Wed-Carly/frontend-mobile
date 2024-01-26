import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { accountStyles } from '../styles';
import userData from '../DummyData.json';

function AccountScreen() {
  const { firstName, lastName, email, availableFunds, distanceTraveled } = useSelector(
    (state) => state.userInfo
  );

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // Add logic for deleting the account
  };

  return (
    <View style={accountStyles.container}>
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

      <Text style={accountStyles.distanceText}>
        Distance travelled: {'\n'}
        {distanceTraveled} km
      </Text>
      <View style={accountStyles.divider} />

      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={accountStyles.actionText}>Delete account</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AccountScreen;
