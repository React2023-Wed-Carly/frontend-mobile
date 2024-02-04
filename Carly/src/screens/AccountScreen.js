import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import DialogInput from 'react-native-dialog-input';
import { accountStyles } from '../styles';
import { topUpAccount } from '../redux/api'; // Import the top-up action

function AccountScreen() {
  const dispatch = useDispatch();
  const [isDialogVisible, setDialogVisible] = useState(false);

  const { firstName, lastName, email, balance, distanceTravelled } = useSelector(
    (state) => state.userInfo
  );

  const theme = useSelector((state) => state.theme);
  const textStyles = { color: theme === 'light' ? '#222' : '#fff', marginLeft: 10, fontSize: 16 };
  const distanceStyles = {
    color: theme === 'light' ? '#222' : '#fff',
    marginBottom: 10,
    fontSize: 16,
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // Add logic for deleting the account
  };

  const handleTopUp = (amount) => {
    try {
      dispatch(topUpAccount(amount * 100));

      console.log('Top-up successful');
    } catch (error) {
      console.error('Error during top-up:', error);
    }
  };

  return (
    <View style={accountStyles.container}>
      <View style={accountStyles.userInfoContainer}>
        <Icon name="person" size={50} color={theme === 'light' ? '#222' : '#fff'} />
        <View style={accountStyles.nameBalanceContainer}>
          <Text style={textStyles}>
            {firstName} {lastName}
          </Text>
          <Text style={textStyles}>${balance}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => setDialogVisible(true)}>
        <Text style={accountStyles.buttonText}>Top Up Account</Text>
      </TouchableOpacity>

      <View style={accountStyles.divider} />

      <View style={accountStyles.userInfoContainer}>
        <Icon name="email" size={30} color={theme === 'light' ? '#222' : '#fff'} />
        <Text style={textStyles}>{email}</Text>
      </View>

      <Text style={distanceStyles}>
        Distance travelled: {'\n'}
        {distanceTravelled} km
      </Text>
      <View style={accountStyles.divider} />

      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={accountStyles.actionText}>Delete account</Text>
      </TouchableOpacity>

      {/* Dialog for choosing the top-up amount */}
      <DialogInput
        isDialogVisible={isDialogVisible}
        title="Account top up"
        message="Enter the amount you want to add to your account"
        hintInput="e.g. 50"
        submitInput={(inputText) => {
          setDialogVisible(false);
          const amount = parseFloat(inputText.replace(',', '.')); // Handle commas as decimal separators
          if (!Number.isNaN(amount) && amount > 0) {
            // Call handleTopUp with the chosen amount
            handleTopUp(amount);
          } else {
            // Handle invalid input (e.g., show an error message)
            console.error('Invalid input for top-up amount');
          }
        }}
        closeDialog={() => setDialogVisible(false)}
        textInputProps={{
          keyboardType: 'numeric',
        }}
        dialogStyle={styles.dialogContainer}
        titleStyle={styles.dialogTitle}
        messageStyle={styles.dialogMessage}
        hintInputStyle={styles.dialogHint}
        textInputStyle={styles.dialogInput}
        submitTextStyle={styles.dialogSubmitText}
        submitText="Top Up"
        submitInputStyle={styles.dialogSubmitButton}
        cancelText="Cancel"
        cancelTextStyle={styles.dialogCancelText}
        cancelStyle={styles.dialogCancelButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  dialogMessage: {
    fontSize: 14,
    color: '#555555',
  },
  dialogHint: {
    fontSize: 14,
    color: '#888888',
  },
  dialogInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dialogSubmitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dialogSubmitButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  dialogCancelText: {
    color: '#3498db',
    fontSize: 16,
  },
  dialogCancelButton: {
    marginTop: 10,
  },
});

export default AccountScreen;
