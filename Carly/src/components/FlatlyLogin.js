import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginFlatly, registerFlatly, fetchFlatBooking } from '../redux/flatlyApi';

function FlatlyLogin({ hideLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const dispatch = useDispatch();

  const id = useSelector((state) => state.userInfo.id);

  const handlePress = async () => {
    // Your login logic here

    if (isLoginMode) dispatch(loginFlatly({ email, password }));
    else dispatch(registerFlatly({ username, lastname, email, password }));

    dispatch(fetchFlatBooking(id));

    await AsyncStorage.setItem('isLoggedInFlatly', 'true');

    hideLogin();
  };

  const toggleForm = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setError(''); // Reset error message when toggling forms
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Flatly</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {isLoginMode ? null : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
        </>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
        <Text style={styles.buttonText}>{isLoginMode ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleForm}>
        <Text style={styles.linkText}>
          {isLoginMode
            ? 'Don’t have an account? Register here'
            : 'Already have an account? Login here'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#ffbe30',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: '#ffbe30',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FlatlyLogin;
