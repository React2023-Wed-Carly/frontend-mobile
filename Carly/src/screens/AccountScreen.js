import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { accountStyles } from '../styles';
import { topUpAccount } from '../redux/api'; // Import the top-up action

function AccountScreen() {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

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

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount.replace(',', '.')); // Handle commas as decimal separators
    if (!Number.isNaN(amount) && amount > 0) {
      // Call your top-up action with the chosen amount
      dispatch(topUpAccount(amount * 100));
      console.log('Top-up successful');
      setModalVisible(false);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.error('Invalid input for top-up amount');
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

      <TouchableOpacity onPress={() => setModalVisible(true)}>
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

      {/* Custom Modal for choosing the top-up amount */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Account top-up</Text>
            <Text style={styles.modalMessage}>
              Enter the amount you want to add to your account
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="e.g. 50"
              onChangeText={(text) => setTopUpAmount(text)}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleTopUp}>
                <Text style={styles.modalButtonText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%', // Set the width as a percentage of the screen width
  },
  modalTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    width: '90%',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
    margin: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
