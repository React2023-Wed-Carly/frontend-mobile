import {
  LIKE_CAR,
  GET_FAVORITE_CARS,
  SET_FILTERS,
  GET_FILTERED_CARS,
  GET_PAYMENTS,
  GET_RENT_HISTORY,
  GET_USER_DATA,
  LOGOUT,
  DELETE_ACCOUNT,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from './actions';

const initialState = {
  userInfo: {
    id: 0,
    username: 'dummyUser',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    password: 'password123',
    currentLocation: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    availableFunds: 1000,
    distanceTraveled: 150,
  },
  likedCars: [],
  filters: {
    maxDistance: Number.MAX_VALUE,
    seatingCapacity: 0,
    dailyPrice: Number.MAX_VALUE,
    transmission: ['Automatic', 'Manual'],
  },
  filteredCars: [],
  payments: [],
  rentHistory: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      const { payload: username } = action;
      // Fetch user data here and update userInfo
      const updatedUserInfo = {}; // Fetch the actual user data
      return {
        ...state,
        userInfo: updatedUserInfo,
      };

    case LIKE_CAR:
      const { payload: carId } = action;
      const isLiked = state.likedCars.includes(carId);
      const likedCars = isLiked
        ? state.likedCars.filter((id) => id !== carId)
        : [...state.likedCars, carId];
      return {
        ...state,
        likedCars,
      };

    case GET_FAVORITE_CARS:
      const { payload: favoriteCars } = action;
      return {
        ...state,
        favoriteCars,
      };

    case SET_FILTERS:
      const { payload: filters } = action;
      return {
        ...state,
        filters,
      };

    case GET_FILTERED_CARS:
      const {
        payload: { filters: carFilters, location },
      } = action;
      // Fetch filtered cars here and update filteredCars
      const updatedFilteredCars = []; // Fetch the actual filtered cars
      return {
        ...state,
        filteredCars: updatedFilteredCars,
      };

    case GET_PAYMENTS:
      const { payload: paymentUsername } = action;
      // Fetch payments here and update payments
      const updatedPayments = []; // Fetch the actual payments
      return {
        ...state,
        payments: updatedPayments,
      };

    case GET_RENT_HISTORY:
      const { payload: rentHistory } = action;
      return {
        ...state,
        rentHistory
      };

    case LOGOUT:
    case DELETE_ACCOUNT:
      return initialState; // Reset state to initial values upon logout or account deletion
    case LOGIN_SUCCESS:
      const { payload: userLoginData } = action;
      console.log('INFO', userLoginData);
      // Handle registration success, update state with user data
      return {
        ...state,
        userInfo: userLoginData,
      };

    case REGISTER_SUCCESS:
      const { payload: userRegisterData } = action;
      // Handle registration success, update state with user data
      return {
        ...state,
        userInfo: userRegisterData,
      };
    default:
      return state;
  }
};

export default rootReducer;
