export const GET_USER_DATA = 'GET_USER_DATA';
export const LIKE_CAR = 'LIKE_CAR';
export const UNLIKE_CAR = 'UNLIKE_CAR';
export const GET_FAVORITE_CARS = 'GET_FAVORITE_CARS';
export const SET_FILTERS = 'SET_FILTERS';
export const GET_FILTERED_CARS = 'GET_FILTERED_CARS';
export const GET_RENT_HISTORY = 'GET_RENT_HISTORY';
export const GET_RENT_HISTORY_CARS = 'GET_RENT_HISTORY_CARS';
export const LOGOUT = 'LOGOUT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const BOOK_CAR = 'BOOK_CAR';
export const BOOK_FLAT = 'BOOK_FLAT';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_UNIT = 'CHANGE_UNIT';
export const SET_LOCATION = 'SET_LOCATION';

export const LOGIN_AGAIN = 'LOGIN_AGAIN';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const TOP_UP_SUCCESS = 'TOP_UP_SUCCESS';
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';

export const FLATLY_LOGIN_SUCCESS = 'FLATLY_LOGIN_SUCCESS';
export const GET_FLATS = 'GET_FLATS';
export const GET_FLAT_DETAILS = 'GET_FLAT_DETAILS'
export const GET_FLAT_IMAGE = 'GET_FLAT_IMAGE';
export const SET_FLAT_BOOKING = "SET_FLAT_BOOKING";
export const SET_CAR_BOOKING = "SET_CAR_BOOKING";
export const GET_FLAT_BOOKING = 'GET_FLAT_BOOKING';
export const CANCEL_FLAT_BOOKING = 'CANCEL_FLAT_BOOKING';

export const CANCEL_CAR_BOOKING = 'CANCAL_CAR_BOOKING';

export const loginAgain = (userData) => ({
  type: LOGIN_AGAIN,
  payload: userData,
});

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

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const changeUnit = (unit) => ({
  type: CHANGE_UNIT,
  payload: unit,
});

export const setLocation = (currentLocation) => ({
  type: SET_LOCATION,
  payload: currentLocation,
});

export const likeCar = (carId) => ({
  type: LIKE_CAR,
  payload: carId,
});

export const unlikeCar = (carId) => ({
  type: UNLIKE_CAR,
  payload: carId,
});

export const bookCar = (carBooking) => ({
  type: BOOK_CAR,
  payload: carBooking,
});

export const bookFlat = (flatBooking) => ({
  type: BOOK_CAR,
  payload: flatBooking,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const getFavoriteCars = (favoriteCars) => ({
  type: GET_FAVORITE_CARS,
  payload: favoriteCars,
});

export const getFilteredCars = (filteredCars) => ({
  type: GET_FILTERED_CARS,
  payload: { filteredCars },
});

export const getRentHistory = (rentHistory) => ({
  type: GET_RENT_HISTORY,
  payload: rentHistory,
});

export const getRentHistoryCars = (rentHistory) => ({
  type: GET_RENT_HISTORY_CARS,
  payload: rentHistory,
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

export const flatlyLoginSuccess = (flatlyData) => ({
  type: FLATLY_LOGIN_SUCCESS,
  payload: flatlyData,
});

export const getFlats = (flats) => ({
  type:GET_FLATS,
  payload: flats
})

export const getFlatDetails = (flatDetails) => ({
  type:GET_FLAT_DETAILS,
  payload:flatDetails
})

export const setFlatBooking = (flatBooking) => ({
  type:SET_FLAT_BOOKING,
  payload:flatBooking
})

export const setCarBooking = (carBooking) => ({
  type:SET_CAR_BOOKING,
  payload:carBooking
})

export const getFlatImage = ({flatId, image}) => ({
  type:GET_FLAT_IMAGE,
  payload: {flatId, image}
})

export const getFlatBooking = ({flatBooking}) => ({
  type:GET_FLAT_BOOKING,
  payload:flatBooking
})

export const cancelFlatBooking = () => ({
  type:CANCEL_FLAT_BOOKING,
})

export const cancelCarBooking = () => ({
  type:CANCEL_FLAT_BOOKING,
})