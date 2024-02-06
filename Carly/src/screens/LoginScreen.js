import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, fetchRentHistory } from '../redux/api';

function LoginScreen({ navigation, updateLoginStatus }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(login({ username, password }));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await dispatch(fetchRentHistory());
      updateLoginStatus(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle incorrect password error
        setError('Incorrect username or password. Please try again.');
      } else {
        console.log('Error during login:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Carly</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Go to Registration</Text>
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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
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
    color: '#3498db',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
