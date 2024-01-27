import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavoriteCars, loginSuccess, registerSuccess, getRentHistory } from './actions';
import { useSelector } from 'react-redux';

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

export const sendLikedCar = (id) => {};

export const sendUnlikedCar = (id) => {};

export const fetchFavoriteCars = () => async (dispatch) => {
  const jwtToken = useSelector(state=>state.userInfo.jwtToken);
  try {
    const response = await axios.get(`${URL}/users/favorites?page=0`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      const favoriteCars = response.data;
      dispatch(getFavoriteCars(favoriteCars));

    } else {
      throw new Error('Fetching favorite cars failed.');
    }
  } catch (error) {
    console.error('Error during fetching favorite cars:', error);
    throw error;
  }
};

export const fetchFilteredCars = (location, filters) => {};

export const fetchPayments = (username) => {};

export const fetchRentHistory = () => async (dispatch) => {
  const jwtToken = useSelector(state=>state.userInfo.jwtToken);
  try {
    const response = await axios.get(`${URL}/users/bookings?page=0`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      const rentHistory = response.data;
      console.log(rentHistory);
      dispatch(getRentHistory(rentHistory));

    } else {
      throw new Error('Fetching rent history failed.');
    }
  } catch (error) {
    console.error('Error during fetching rent history:', error);
    throw error;
  }
};

export const handleLogout = (username) => {};

export const deleteAccount = (username) => {};
