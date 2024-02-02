import {
  UNLIKE_CAR,
  LIKE_CAR,
  GET_FAVORITE_CARS,
  SET_FILTERS,
  GET_FILTERED_CARS,
  GET_RENT_HISTORY,
  GET_RENT_HISTORY_CARS,
  GET_USER_DATA,
  LOGOUT,
  DELETE_ACCOUNT,
  REGISTER_SUCCESS,
  LOGIN_AGAIN,
  LOGIN_SUCCESS,
  TOP_UP_SUCCESS,
  GET_PAYMENTS_SUCCESS,
  CHANGE_THEME,
  CHANGE_UNIT,
  SET_LOCATION,
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
    balance: 1000,
    distanceTravelled: 150,
  },
  unit: 'kilometers',
  theme: 'light',
  favoriteCars: [],
  filters: {
    minPrice: 0,
    maxPrice: 10000,
    minSeat: 0,
    maxSeat: 10,
    trans: [],
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
    case CHANGE_THEME:
      const { payload: theme } = action;
      return {
        ...state,
        theme,
      };

    case CHANGE_UNIT:
      const { payload: unit } = action;
      return {
        ...state,
        unit,
      };
    case SET_LOCATION:
      const { payload: currentLocation } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          currentLocation,
        },
      };

    case LIKE_CAR:
      const { payload: likedId } = action;
      const car = state.carsDetails.find((item) => item.info.id === likedId);
      const newFavoriteCars = [...state.favoriteCars, car];
      return {
        ...state,
        favoriteCars: newFavoriteCars,
      };

    case UNLIKE_CAR:
      const { payload: unlikedId } = action;
      newFavoriteCars = state.favoriteCars.filter((item) => item.info.id !== unlikedId);
      return {
        ...state,
        favoriteCars: newFavoriteCars,
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

    case GET_RENT_HISTORY:
      const { payload: rentHistory } = action;
      return {
        ...state,
        rentHistory,
      };
    case GET_RENT_HISTORY_CARS:
      const { payload: carsDetails } = action;

      const oldRentHistory = state.rentHistory;
      const carsDetailsMap = new Map(carsDetails.map((car) => [car.info.id, car]));

      // Update each element in rentHistory with car information
      const updatedRentHistory = oldRentHistory.map((historyItem) => ({
        ...historyItem,
        car: carsDetailsMap.get(historyItem.carId),
      }));

      return {
        ...state,
        rentHistoryCars: carsDetails,
        rentHistory: updatedRentHistory,
      };

    case LOGOUT:
    case DELETE_ACCOUNT:
      return initialState; // Reset state to initial values upon logout or account deletion
    case LOGIN_SUCCESS:
      const { payload: userLoginData } = action;
      // Handle registration success, update state with user data
      return {
        ...state,
        userInfo: userLoginData,
      };
    case LOGIN_AGAIN:
      // Handle registration success, update state with user data
      return {
        ...state,
      };

    case REGISTER_SUCCESS:
      const { payload: userRegisterData } = action;
      // Handle registration success, update state with user data
      return {
        ...state,
        userInfo: userRegisterData,
      };
    case GET_PAYMENTS_SUCCESS:
      const { payload: payments } = action;
      return {
        ...state,
        payments: payments.reverse(),
      };
    case TOP_UP_SUCCESS:
      const { payload: amount } = action;
      // Update the relevant part of your state with the new user data
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          balance: state.userInfo.balance + amount,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
