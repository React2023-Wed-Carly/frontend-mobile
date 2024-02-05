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
  flatlyLoginSuccess,
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
      console.error('Error during registration:', error);
      throw error;
    }
  };

export const loginFlatly =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      console.log(email, password);
      const response = await axios.post(`${URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const jwtToken = response.data.jwttoken;

        await SecureStore.setItemAsync('flatlyToken', jwtToken);
        dispatch(flatlyLoginSuccess());
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
