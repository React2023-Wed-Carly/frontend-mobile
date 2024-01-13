import {
  LIKE_CAR,
  GET_FAVOURITE_CARS,
  SET_FILTERS,
  GET_FILTERED_CARS,
  GET_PAYMENTS,
  GET_RENT_HISTORY,
  GET_USER_DATA,
  LOGOUT,
  DELETE_ACCOUNT,

  likeCar,
  getFavouriteCars,
  setFilters,
  getFilteredCars,
  getPayments,
  getRentHistory,
} from './actions';

const initialState = {
  userInfo: {
    id: 0,
    username: 'dummyUser',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phoneNumber: '123456789',
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
    seatigCapacity: 0,
    dailyPrice: Number.MAX_VALUE,
    transmission: ['Automatic', 'Manual'],
  },
  filteredCars: [],
  payments: [],
  rentHistory: [],
};

const rootReducer = (state = initialState, action) => {
  let username;
  switch (action.type) {
    case GET_USER_DATA:
      username = action.payload;
      // fetch user data
      const userInfo = {};
      return {
        ...state,
        userInfo,
      };
    case LIKE_CAR:
      const carId = action.payload;
      const isLiked = state.likedProducts.includes(carId);
      const likedCars = isLiked
        ? state.likedCars.filter((id) => id !== carId) // remember - filter creates a new array
        : [...state.likedCars, carId];
      return {
        ...state,
        likedCars,
      };
    case GET_FAVOURITE_CARS:
      username = action.payload;
      // fetch favourite cars
      const favouriteCars = [];
      return {
        ...state,
        favouriteCars,
      };
    case SET_FILTERS:
      const filters = action.payload;
      return {
        ...state,
        filters,
      };
    case GET_FILTERED_CARS:
      const carFilters = action.payload.filters;
      const { location } = action.payload;
      // fetch filtered cars
      const filteredCars = [];
      return {
        ...state,
        filteredCars,
      };
    case GET_PAYMENTS:
      username = action.payload;
      // fetch payments
      const payments = [];
      return {
        ...state,
        payments,
      };
    case GET_RENT_HISTORY:
      const username = action.payload;
      // fetch rent history
      const rentHistory = [];
      return {
        ...state,
        rentHistory,
      };
    case LOGOUT:
      return state;
    case DELETE_ACCOUNT:
      return state;
    default:
      return state;
  }
};

export default rootReducer;
