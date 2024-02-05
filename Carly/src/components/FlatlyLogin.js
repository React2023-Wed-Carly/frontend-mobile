import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginFlatly, registerFlatly } from '../redux/flatlyApi';

function FlatlyLogin({ hideLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Add username state
  const [lastname, setLastname] = useState(''); // Add lastname state
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const dispatch = useDispatch();

  const handlePress = async () => {
    // Your login logic here

    if (isLoginMode) dispatch(loginFlatly({ email, password }));
    else dispatch(registerFlatly({ username, lastname, email, password })); // Pass username and lastname for registration
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
      {isLoginMode ? null : ( // Display username and lastname fields only in registration mode
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

export default FlatlyLogin;
