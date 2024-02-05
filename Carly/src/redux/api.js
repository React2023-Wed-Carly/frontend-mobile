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
  setLocation,
  getFilteredCars,
  bookCar,
  bookFlat,
  logout,
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

        await AsyncStorage.setItem('userInfo', JSON.stringify({ ...userData }));
        await SecureStore.setItemAsync('carlyToken', jwtToken);
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
        await SecureStore.setItemAsync('carlyToken', jwtToken);
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
      await SecureStore.setItemAsync('carlyToken', jwtToken);
      return jwtToken;
    }
    throw new Error('Login failed');
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const fetchDataWithRetry = async (url, config, dispatch, successCallback, storageKey) => {
  try {
    const response = await axios(url, config);

    if (response.status === 200) {
      const { data } = response;
      if (storageKey) await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      if (successCallback) dispatch(successCallback(data));
      return data;
    }
    throw new Error(`Fetching data failed for ${url}.`);
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
          if (storageKey) await AsyncStorage.setItem(storageKey, JSON.stringify(data));

          if (successCallback) dispatch(successCallback(data));
          return data;
        }
        throw new Error(`Fetching data retry failed for ${url}.`);
      } catch (tokenError) {
        console.error('Error during token refresh:', tokenError);
        throw tokenError;
      }
    } else {
      throw error;
    }
  }
};

const postDataWithRetry = async (url, data, config, dispatch, successCallback, storageKey) => {
  try {
    const response = await axios.post(url, data, config);

    if (response.status === 200 || response.status === 201) {
      const responseData = response.data;
      await AsyncStorage.setItem(storageKey, JSON.stringify(responseData));
      dispatch(successCallback(responseData));
    } else {
      throw new Error(`Post request failed for ${url}.`);
    }
  } catch (error) {
    console.error(`Error during post request for ${url}:`, error);

    // Check if the error is due to unauthorized access
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      try {
        // Try to get a new token
        const newToken = await dispatch(getNewToken());

        // Retry the request with the new token
        const response = await axios.post(url, data, {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${newToken}` },
        });

        if (response.status === 200 || response.status === 201) {
          const responseData = response.data;
          await AsyncStorage.setItem(storageKey, JSON.stringify(responseData));
          dispatch(successCallback(responseData));
        } else {
          throw new Error(`Post request failed for ${url}.`);
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
    const jwtToken = await SecureStore.getItemAsync('carlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    await postDataWithRetry(
      `${URL}/users/details/Topup`,
      null,
      { params: { amount }, headers: { Authorization: `Bearer ${jwtToken}` } },
      dispatch,
      topUpSuccess,
      'userInfo'
    );

    const storedUserData = await AsyncStorage.getItem('userInfo');
    const parsedUserData = JSON.parse(storedUserData);

    await updateUserData('balance', parsedUserData.balance + amount);

    console.log('Top-up successful');
  } catch (error) {
    console.error('Error during top-up:', error);
    throw error;
  }
};

export const sendLikedCar = (id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('carlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    await postDataWithRetry(
      `${URL}/users/favorites/${id}`,
      null,
      { headers: { Authorization: `Bearer ${jwtToken}` } },
      dispatch,
      likeCar,
      'favoriteCars'
    );
  } catch (error) {
    console.error('Error during adding car to favorites:', error);
    throw error;
  }
};

export const sendUnlikedCar = (id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('carlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    await postDataWithRetry(
      `${URL}/users/favorites/${id}`,
      null,
      { headers: { Authorization: `Bearer ${jwtToken}` } },
      dispatch,
      unlikeCar,
      'favoriteCars'
    );
  } catch (error) {
    console.error('Error during deleting car from favorites:', error);
    throw error;
  }
};

export const getPayments = (page) => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('carlyToken');
  const url = `${URL}/users/details/payments`;
  const config = {
    params: { page },
    headers: { Authorization: `Bearer ${jwtToken}`, 'Content-Type': 'application/json' },
  };

  await fetchDataWithRetry(url, config, dispatch, getPaymentsSuccess, 'payments');
};

export const setNewLocation = (location) => async (dispatch) => {
  dispatch(setLocation(location));
};

export const fetchFilteredCars =
  ({ location, filters }) =>
  async (dispatch) => {
    const jwtToken = await SecureStore.getItemAsync('carlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }

    const params = {
      page: 0,
      lat: location.latitude,
      lon: location.longitude,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minSeat: filters.minSeat,
      maxSeat: filters.maxSeat,
      trans: filters.trans.join(';'),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      await fetchDataWithRetry(
        `${URL}/cars`,
        { params, ...config },
        dispatch,
        getFilteredCars,
        'filteredCars'
      );
    } catch (error) {
      console.error('Error during fetching favorite cars:', error);
      throw error;
    }
  };

export const fetchFavoriteCars = (page) => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('carlyToken');

  if (!jwtToken) {
    throw new Error('JWT token not found. User must be logged in.');
  }

  const url = `${URL}/users/favorites`;
  const config = {
    params: { page },
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  await fetchDataWithRetry(url, config, dispatch, getFavoriteCars, 'favoriteCars');
};

export const fetchRentHistory = (page) => async (dispatch) => {
  const jwtToken = await SecureStore.getItemAsync('carlyToken');

  if (!jwtToken) {
    throw new Error('JWT token not found. User must be logged in.');
  }

  const url = `${URL}/users/details/bookings`;
  const config = {
    params: { page },
    headers: { Authorization: `Bearer ${jwtToken}` },
  };

  try {
    const rentHistoryData = await fetchDataWithRetry(
      url,
      config,
      dispatch,
      getRentHistory,
      'rentHistory'
    );

    await fetchRentHistoryCars(dispatch, rentHistoryData);
  } catch (error) {
    console.error('Error during fetching rent history:', error);
    throw error;
  }
};

export const fetchRentHistoryCars = async (dispatch, rentHistory) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('carlyToken');
    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }
    const fetchedDetails = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const historyItem of rentHistory) {
      const { carId } = historyItem;

      try {
        // eslint-disable-next-line no-await-in-loop
        const carDetails = await fetchDataWithRetry(
          `${URL}/cars/${carId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          },
          dispatch,
          null,
          null
        );

        // Check if the car is a favorite
        // eslint-disable-next-line no-await-in-loop
        const isFavoriteResponse = await fetchDataWithRetry(
          `${URL}/users/favorites/isFavorite/${carId}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          },
          dispatch,
          null,
          null
        );

        carDetails.isFavorite = isFavoriteResponse;
        fetchedDetails.push(carDetails);
      } catch (error) {
        console.error(`Error during fetching details for carId ${carId}:`, error);
        // Omit failed entry and continue with the next one
      }
    }

    await AsyncStorage.setItem('carsDetails', JSON.stringify(fetchedDetails));
    dispatch(getRentHistoryCars(fetchedDetails));
  } catch (error) {
    console.error('Error during fetching rent history cars:', error);
    throw error;
  }
};

export const sendCarBooking = (car, carBooking) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('carlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }
    const response = await axios.post(
      `${URL}/cars/${car.info.id}/bookings`,
      { ...carBooking },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      console.log('success');
      await AsyncStorage.setItem('currentCarBooking', JSON.stringify({ booking: carBooking, car }));
      dispatch(bookCar({ booking: carBooking, car }));
    } else {
      console.error('Error during adding car booking:', response.status);
      if (response.status === 404) {
        throw new Error('Dates are overlapping.');
      } else {
        throw new Error('Unexpected error during car booking.');
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === 404) {
      throw new Error('Dates are overlapping.');
    }
  }
};

export const sendFlatBooking = (flatBooking) => async (dispatch) => {};

export const logUserOut = () => async (dispatch) => {
  await AsyncStorage.clear();
  await SecureStore.clear();
  dispatch(logout());
};

export const deleteAccount = (username) => {
  // Implement account deletion logic if needed
};
