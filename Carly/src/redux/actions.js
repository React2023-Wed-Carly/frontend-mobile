export const GET_USER_DATA = "GET_USER_DATA";
export const LIKE_CAR = "LIKE_CAR";
export const GET_FAVOURITE_CARS = "GET_FAVOURITE_CARS";
export const SET_FILTERS = "SET_FILTERS";
export const GET_FILTERED_CARS = "GET_FILTERED_CARS";
export const GET_PAYMENTS = "GET_PAYMENTS";
export const GET_RENT_HISTORY = "GET_RENT_HISTORY";
export const LOGOUT = "LOGOUT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

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

export const getPayments = (username) => ({
  type: GET_PAYMENTS,
  payload: username,
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
