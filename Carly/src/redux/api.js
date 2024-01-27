import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, registerSuccess, topUpSuccess } from './actions';

const URL = 'https://wedcarly.azurewebsites.net/';

const fetchUserDetails = async (jwtToken) => {
  try {
    const userDetailsResponse = await axios.get(`${URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (userDetailsResponse.status === 200) {
      return userDetailsResponse.data;
    }
    throw new Error('User details fetch failed');
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const jwtToken = response.data.jwttoken;

        // Use the token to fetch user details
        const userData = await fetchUserDetails(jwtToken);

        // Dispatch actions for successful login and user details
        dispatch(loginSuccess({ ...userData, jwtToken }));

        // Save user information to AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userData, jwtToken }));
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };
export const register =
  ({ username, firstName, lastName, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/users`, {
        username,
        firstname: firstName,
        lastName,
        email,
        password,
        DistanceTravelled: 0,
        balance: 0,
      });

      if (response.status === 201) {
        const jwtToken = response.data.jwttoken;

        // Use the token to fetch user details
        const userData = await fetchUserDetails(jwtToken);

        // Dispatch actions for successful registration and user details
        dispatch(registerSuccess({ ...userData, jwtToken }));

        // Save user information to AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userData, jwtToken }));
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

const updateUserData = async (field, value) => {
  try {
    // Retrieve existing user data from AsyncStorage
    const storedUserData = await AsyncStorage.getItem('userInfo');

    if (storedUserData) {
      // Parse the stored user data
      const parsedUserData = JSON.parse(storedUserData);

      // Update the specified field with the new value
      parsedUserData[field] = value;

      // Save the updated user information back to AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify(parsedUserData));

      console.log(`User data field '${field}' updated successfully.`);
    } else {
      console.error('Error updating user data: User data not found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const topUpAccount = (amount) => async (dispatch) => {
  try {
    // Retrieve JWT token from AsyncStorage
    const userInfo = await AsyncStorage.getItem('userInfo');
    const { jwtToken } = JSON.parse(userInfo);

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    // Make a request to the top-up endpoint with the provided amount
    const response = await axios.post(`${URL}/users/details/Topup`, null, {
      params: {
        amount,
      },

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      // Dispatch action for successful top-up
      dispatch(topUpSuccess(amount));

      const storedUserData = await AsyncStorage.getItem('userInfo');
      const parsedUserData = JSON.parse(storedUserData);

      // Save the updated user information to AsyncStorage
      await updateUserData('balance', parsedUserData.balance + amount);

      console.log('Top-up successful');
    } else {
      throw new Error('Top-up failed');
    }
  } catch (error) {
    console.error('Error during top-up:', error);
    throw error;
  }
};

export const sendLikedCar = (id) => {};

export const fetchFavouriteCars = (username) => {};

export const fetchFilteredCars = (location, filters) => {};

export const fetchPayments = (username) => {};

export const fetchRentHistory = (username) => {};

export const handleLogout = (username) => {};

export const deleteAccount = (username) => {};
