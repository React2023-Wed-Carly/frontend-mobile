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

export const getPayments = () => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const paymentsData = await axios
      .get(`${URL}/users/details/payments`, {
        params: { page: 0 },
        headers: { Authorization: `Bearer ${jwtToken}`, 'Content-Type': 'application/json' },
      })
      .then((response) => response.data);

    dispatch(getPaymentsSuccess(paymentsData));
  } catch (error) {
    console.error('Error during receiving payments:', error);

    // Check if the error is due to unauthorized access
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      try {
        // Try to get a new token
        const newToken = await dispatch(getNewToken());

        // Retry the request with the new token
        const paymentsData = await axios
          .get(`${URL}/users/details/payments`, {
            params: { page: 0 },
            headers: { Authorization: `Bearer ${newToken}`, 'Content-Type': 'application/json' },
          })
          .then((response) => response.data);

        dispatch(getPaymentsSuccess(paymentsData));
      } catch (tokenError) {
        console.error('Error during token refresh:', tokenError);
        throw tokenError;
      }
    } else {
      throw error;
    }
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
      dispatch(unlikeCar(id));
    } else {
      throw new Error('Deleting car from favorites failed.');
    }
  } catch (error) {
    console.error('Error during deleting car from favorites:', error);
    throw error;
  }
};

export const fetchFavoriteCars = () => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const response = await axios.get(`${URL}/users/favorites`, {
      params: { page: 0 },
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 200) {
      const favoriteCars = response.data;
      dispatch(getFavoriteCars(favoriteCars));
    } else {
      throw new Error('Fetching favorite cars failed.');
    }
  } catch (error) {
    console.error('Error during fetching favorite cars:', error);

    // Check if the error is due to unauthorized access
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      try {
        // Try to get a new token
        const newToken = await dispatch(getNewToken());

        // Retry the request with the new token
        const response = await axios.get(`${URL}/users/favorites`, {
          params: { page: 0 },
          headers: { Authorization: `Bearer ${newToken}` },
        });

        if (response.status === 200) {
          const favoriteCars = response.data;
          dispatch(getFavoriteCars(favoriteCars));
        } else {
          throw new Error('Fetching favorite cars failed.');
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

export const fetchRentHistory = () => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('userToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const response = await axios.get(`${URL}/users/details/bookings`, {
      params: { page: 0 },
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (response.status === 200) {
      const rentHistory = response.data;
      dispatch(getRentHistory(rentHistory));
      dispatch(fetchRentHistoryCars(rentHistory));
    } else {
      throw new Error('Fetching rent history failed.');
    }
  } catch (error) {
    console.error('Error during fetching rent history:', error);

    // Check if the error is due to unauthorized access
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      try {
        // Try to get a new token
        const newToken = await dispatch(getNewToken());

        // Retry the request with the new token
        const response = await axios.get(`${URL}/bookings`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });

        if (response.status === 200) {
          const rentHistory = response.data;
          dispatch(getRentHistory(rentHistory));
          dispatch(fetchRentHistoryCars(rentHistory));
        } else {
          throw new Error('Fetching rent history failed.');
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
