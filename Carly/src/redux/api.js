import axiosRetry from 'axios-retry';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getPaymentsSuccess,
  getFavoriteCars,
  loginSuccess,
  registerSuccess,
  getRentHistory,
  topUpSuccess,
  likeCar,
  unlikeCar,
  getRentHistoryCars,
  loginAgain,
} from './actions';

const URL = 'https://wedcarly.azurewebsites.net';

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
        const userData = await fetchUserDetails();

        dispatch(registerSuccess({ ...userData, jwtToken }));

        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userData, jwtToken }));
        await SecureStore.setItemAsync('userToken', jwtToken);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
        const userData = await fetchUserDetails(jwtToken);

        dispatch(loginSuccess({ ...userData, jwtToken }));

        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userData, jwtToken }));
        await SecureStore.setItemAsync('userToken', jwtToken);
        await SecureStore.setItemAsync('userLogin', JSON.stringify({ username, password }));
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

export const getNewToken = () => async (dispatch) => {
  try {
    const loginData = await SecureStore.getItemAsync('userLogin');
    const { username, password } = JSON.parse(loginData);

    const response = await axios.post(`${URL}/auth/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const jwtToken = response.data.jwttoken;
      await SecureStore.setItemAsync('userToken', jwtToken);
      return jwtToken;
    }
    throw new Error('Login failed');
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const fetchUserDetails = async (jwtToken) => {
  try {
    const userDetailsResponse = await axios.get(`${URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return userDetailsResponse.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

const updateUserData = async (field, value) => {
  try {
    const storedUserData = await AsyncStorage.getItem('userInfo');
    const parsedUserData = JSON.parse(storedUserData);

    if (parsedUserData) {
      parsedUserData[field] = value;
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
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const response = await axios.post(`${URL}/users/details/Topup`, null, {
      params: { amount },
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 200) {
      dispatch(topUpSuccess(amount));

      const storedUserData = await AsyncStorage.getItem('userInfo');
      const parsedUserData = JSON.parse(storedUserData);

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

export const sendLikedCar = (id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const response = await axios.post(`${URL}/users/favorites/${id}`, null, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 201) {
      const prevFavoriteCars = await AsyncStorage.getItem('favoriteCars');
      const carsDetails = await AsyncStorage.getItem('carsDetails');
      const car = carsDetails.find((item) => item.info.id === id);
      await AsyncStorage.setItem('favoriteCars', JSON.stringify([...prevFavoriteCars, car]));
      dispatch(likeCar(id));
    } else {
      throw new Error('Adding car to favorites failed.');
    }
  } catch (error) {
    console.error('Error during adding car to favorites:', error);
    throw error;
  }
};

export const sendUnlikedCar = (id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const response = await axios.delete(`${URL}/users/favorites/${id}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 201) {
      const prevFavoriteCars = await AsyncStorage.getItem('favoriteCars');
      await AsyncStorage.setItem(
        'favoriteCars',
        JSON.stringify(prevFavoriteCars.filter((item) => item.info.id !== id))
      );
      dispatch(unlikeCar(id));
    } else {
      throw new Error('Deleting car from favorites failed.');
    }
  } catch (error) {
    console.error('Error during deleting car from favorites:', error);
    throw error;
  }
};

const fetchDataWithRetry = async (url, config, dispatch, successCallback) => {
  try {
    const response = await axios(url, config);

    if (response.status === 200) {
      const { data } = response;
      await AsyncStorage.setItem(url, JSON.stringify(data));
      dispatch(successCallback(data));
    } else {
      throw new Error(`Fetching data failed for ${url}.`);
    }
  } catch (error) {
    console.error(`Error during fetching data for ${url}:`, error);

    // Check if the error is due to unauthorized access
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      try {
        // Try to get a new token
        const newToken = await dispatch(getNewToken());

        // Retry the request with the new token
        const response = await axios(url, {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${newToken}` },
        });

        if (response.status === 200) {
          const { data } = response;
          await AsyncStorage.setItem(url, JSON.stringify(data));
          dispatch(successCallback(data));
        } else {
          throw new Error(`Fetching data failed for ${url}.`);
        }
      } catch (tokenError) {
        console.error('Error during token refresh:', tokenError);
        throw tokenError;
      }
    } else {
      throw error;
    }
  }
};

export const getPayments = () => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('userToken');

  if (!jwtToken) {
    throw new Error('JWT token not found. User must be logged in.');
  }

  const url = `${URL}/users/details/payments`;
  const config = {
    params: { page: 0 },
    headers: { Authorization: `Bearer ${jwtToken}`, 'Content-Type': 'application/json' },
  };

  await fetchDataWithRetry(url, config, dispatch, getPaymentsSuccess);
};

export const fetchFavoriteCars = () => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('userToken');

  if (!jwtToken) {
    throw new Error('JWT token not found. User must be logged in.');
  }

  const url = `${URL}/users/favorites`;
  const config = {
    params: { page: 0 },
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  await fetchDataWithRetry(url, config, dispatch, getFavoriteCars);
};

export const fetchRentHistory = () => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('userToken');

  if (!jwtToken) {
    throw new Error('JWT token not found. User must be logged in.');
  }

  const url = `${URL}/users/details/bookings`;
  const config = {
    params: { page: 0 },
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  await fetchDataWithRetry(url, config, dispatch, (data) => {
    dispatch(getRentHistory(data));
    dispatch(fetchRentHistoryCars(data));
  });
};

export const fetchRentHistoryCars = (rentHistory) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const carsDetails = [];
    for (const historyItem of rentHistory) {
      const carId = historyItem['carId'];
      try {
        const response = await axios.get(`${URL}/cars/${carId}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        if (response.status === 200) {
          const carDetails = response.data;
          carsDetails.push(carDetails);
        } else {
          throw new Error(`Fetching details for carId ${carId} failed.`);
        }
      } catch (error) {
        console.error(`Error during fetching details for carId ${carId}:`, error);
        throw error;
      }
    }
    await AsyncStorage.setItem('carsDetails', JSON.stringify(carsDetails));
    dispatch(getRentHistoryCars(carsDetails));
  } catch (error) {
    console.error('Error during fetching rent history cars:', error);
    throw error;
  }
};

export const handleLogout = (username) => {
  // Implement logout logic if needed
};

export const deleteAccount = (username) => {
  // Implement account deletion logic if needed
};
