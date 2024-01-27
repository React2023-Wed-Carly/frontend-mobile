export const GET_USER_DATA = 'GET_USER_DATA';
export const LIKE_CAR = 'LIKE_CAR';
export const GET_FAVOURITE_CARS = 'GET_FAVOURITE_CARS';
export const SET_FILTERS = 'SET_FILTERS';
export const GET_FILTERED_CARS = 'GET_FILTERED_CARS';
export const GET_RENT_HISTORY = 'GET_RENT_HISTORY';
export const LOGOUT = 'LOGOUT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const TOP_UP_SUCCESS = 'TOP_UP_SUCCESS';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const registerSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  payload: userData,
});

export const getUserData = (username) => ({
  type: GET_USER_DATA,
  payload: username,
});

export const likeCar = (carId) => ({
  type: LIKE_CAR,
  payload: carId,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const getFavouriteCars = (username) => ({
  type: GET_FAVOURITE_CARS,
  payload: username,
});

export const getFilteredCars = (location, filters) => ({
  type: GET_FILTERED_CARS,
  payload: { location, filters },
});

export const getRentHistory = (username) => ({
  type: GET_RENT_HISTORY,
  payload: username,
});

export const logout = (username) => ({
  type: LOGOUT,
  payload: username,
});

export const deleteAccount = (username) => ({
  type: LOGOUT,
  payload: username,
});

export const topUpSuccess = (userData) => ({
  type: TOP_UP_SUCCESS,
  payload: userData,
});

export const getPaymentsSuccess = (payments) => ({
  type: GET_PAYMENTS_SUCCESS,
  payload: payments,
});
