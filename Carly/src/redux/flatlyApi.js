import axiosRetry from 'axios-retry';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  bookFlat,
  flatlyLoginSuccess,
  getFlatDetails,
  cancelFlatBooking,
  getFlats,
  getFlatBooking,
} from './actions';

const URL = 'https://pwflatlyreact.azurewebsites.net';

export const registerFlatly =
  ({ username, lastName, email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/auth/register`, {
        username,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        const jwtToken = response.data.jwttoken;

        await SecureStore.setItemAsync('flatlyToken', jwtToken);
        dispatch(flatlyLoginSuccess());
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      throw error;
    }
  };

export const loginFlatly =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const jwtToken = response.data.jwttoken;

        await SecureStore.setItemAsync('flatlyToken', jwtToken);
        dispatch(flatlyLoginSuccess());
      } else {
        throw new Error('Login to flatly failed');
      }
    } catch (error) {
      console.log('Error during login to flatly:', error);
      throw error;
    }
  };

export const fetchFlats = () => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('flatlyToken');
    const response = await axios.get(`${URL}/flats?page=0&pageSize=10`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      const flats = response.data;
      dispatch(getFlats(flats.data));
    } else {
      throw new Error('Fetching flats failed.');
    }
  } catch (error) {
    console.log('Error during fetching flats.', error);
    throw error;
  }
};

export const fetchFlatDetails = (flatId) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('flatlyToken');
    const response = await axios.get(`${URL}/flats/${flatId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      const flat = response.data;
      dispatch(getFlatDetails(flat));
    } else {
      throw new Error('Fetching flat details failed.');
    }
  } catch (error) {
    console.log('Error during fetching flat details.', error);
    throw error;
  }
};

export const fetchFlatBooking = (id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('flatlyToken');

    const response = await axios.get(
      `${URL}/reservations?page=0&pageSize=10&externalUserId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log(response.data);

    if (response.status === 200) {
      dispatch(getFlatBooking(response.data));
    } else {
      console.log('Error during fetching flat booking:', response.status);
    }
  } catch (error) {
    console.log('Error during fetching flat booking:', error);
    throw error;
  }
};

export const sendFlatBooking = (flat, flatBooking, id) => async (dispatch) => {
  try {
    const jwtToken = await SecureStore.getItemAsync('flatlyToken');

    if (!jwtToken) {
      throw new Error('JWT token not found. User must be logged in.');
    }
    const response = await axios.post(`${URL}/reservation?externalUserId=${id}`, flatBooking, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
    await AsyncStorage.setItem(
      'currentFlatBooking',
      JSON.stringify({ booking: flatBooking, flat })
    );
    console.log('success');

    dispatch(bookFlat({ booking: flatBooking, flat }));
    } else {
      console.log('Error during adding flat booking:', response.status);
      if (response.status === 422) {
        throw new Error('Dates are overlapping.');
      } else {
        throw new Error('Unexpected error during flat booking.');
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.status === 422) {
      throw new Error('Dates are overlapping.');
    } else {
      throw new Error('Unexpected error during flat booking.');
    }
  }
};

export const deleteFlatBooking = () => async (dispatch) => {
  AsyncStorage.removeItem('currentFlatBooking');
  dispatch(cancelFlatBooking());
};
