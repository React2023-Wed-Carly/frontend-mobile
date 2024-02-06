import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { accountStyles as styles } from '../styles';
import { topUpAccount } from '../redux/api';

function AccountScreen() {
  const dispatch = useDispatch();
  const [isTopUpModalVisible, setTopUpModalVisible] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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
    setDeleteModalVisible(true);
  };

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount.replace(',', '.')); // Handle commas as decimal separators
    if (!Number.isNaN(amount) && amount > 0) {
      // Call your top-up action with the chosen amount
      dispatch(topUpAccount(amount * 100));
      console.log('Top-up successful');
      setTopUpModalVisible(false);
    } else {
      // Handle invalid input (e.g., show an error message)
      console.log('Invalid input for top-up amount');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Icon name="person" size={50} color={theme === 'light' ? '#222' : '#fff'} />
        <View style={styles.nameBalanceContainer}>
          <Text style={textStyles}>
            {firstName} {lastName}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={textStyles}>${balance}</Text>
            <TouchableOpacity onPress={() => setTopUpModalVisible(true)}>
              <Icon name="add" size={25} color={theme === 'light' ? '#222' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.userInfoContainer}>
        <Icon name="email" size={30} color={theme === 'light' ? '#222' : '#fff'} />
        <Text style={textStyles}>{email}</Text>
      </View>

      <Text style={distanceStyles}>
        Distance travelled: {'\n'}
        {distanceTravelled} km
      </Text>
      <View style={styles.divider} />

      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={styles.actionText}>Delete account</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={isTopUpModalVisible}
        onRequestClose={() => setTopUpModalVisible(false)}
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
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setTopUpModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.modalButton, ...styles.activeModalButton }}
                onPress={handleTopUp}
              >
                <Text style={styles.modalButtonText}>Top Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        {/* Delete Account Modal content */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={{ ...styles.modalMessage, marginTop: 10, padding: 10 }}>
              If you want to delete your account, contact Carly under admin@carly.com{'\n\n'}
              Carly administrator will assist you with the deletion. Remember, that when deleted,
              account cannot be brought back.
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={{ ...styles.modalButton, ...styles.activeModalButton }}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AccountScreen;
