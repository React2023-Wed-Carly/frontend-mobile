import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { accountStyles } from "../styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import userData from "../DummyData.json";
import { useSelector } from "react-redux";

const AccountScreen = () => {
  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   phoneNumber,
  //   availableFunds,
  //   distanceTraveled,
  // } = userData.currentUser;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    availableFunds,
    distanceTraveled,
  } = useSelector((state) => 
    state.userInfo);

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
    // Add logic for deleting the account
  };

  const handleLogout = () => {
    console.log("Log out clicked");
    // Add logic for logging out
  };

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
        Distance travelled: {"\n"}
        {distanceTraveled} km
      </Text>
      <View style={accountStyles.divider} />

      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={accountStyles.actionText}>Delete account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={accountStyles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
