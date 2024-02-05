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
  SET_LOCATION,
  CHANGE_UNIT,
  BOOK_CAR,
  BOOK_FLAT,
  CHANGE_THEME,
  FLATLY_LOGIN_SUCCESS,
} from './actions';

const initialState = {
  userInfo: {
    id: 0,
    username: 'dummyUser',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    password: 'password123',
    balance: 1000,
    distanceTravelled: 150,
  },
  flatlyData: {
    isLoggedIn: false,
  },
  currentLocation: {
    latitude: 40.7128,
    longitude: -74.006,
  },
  unit: 'kilometers',
  theme: 'light',
  favoriteCars: null,
  filters: {
    minPrice: 0,
    maxPrice: 10000,
    minSeat: 0,
    maxSeat: 10,
    trans: [],
  },
  filteredCars: [],
  currentCarBooking: null,
  currentFlatBooking: null,
  payments: null,
  paymentsPage: 0,
  paymentsPageEnd: false,
  favoriteCarsPage: 0,
  favoriteCarsPageEnd: false,
  rentHistory: null,
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

    case LIKE_CAR:
      const { payload: likedId } = action;
      const car = state.carsDetails.find((item) => item.info.id === likedId);
      let newFavoriteCars = [...state.favoriteCars, car];
      return {
        ...state,
        favoriteCarsPageEnd: false,
        favoriteCarsPage: 0,
        favoriteCars: newFavoriteCars,
      };

    case UNLIKE_CAR:
      const { payload: unlikedId } = action;
      newFavoriteCars = state.favoriteCars.filter((item) => item.info.id !== unlikedId);
      return {
        ...state,
        favoriteCarsPageEnd: false,
        favoriteCarsPage: 0,
        favoriteCars: newFavoriteCars,
      };
    case BOOK_CAR:
      const { payload: carBooking } = action;
      return {
        ...state,
        currentCarBooking: carBooking,
      };

    case BOOK_FLAT:
      const { payload: flatBooking } = action;
      return {
        ...state,
        currentFlatBooking: flatBooking,
      };

    case GET_FAVORITE_CARS:
      const { payload: favoriteCars } = action;
      let pageNumber = state.favoriteCarsPageEnd
        ? state.favoriteCarsPage
        : !state.favoriteCarsPageEnd && favoriteCars.length === 0
          ? state.favoriteCarsPage - 1
          : state.favoriteCarsPage + 1;
      return {
        ...state,
        favoriteCarsPageEnd: !state.paymentsPageEnd
          ? favoriteCars.length === 0
          : state.favoriteCarsPageEnd,
        favoriteCarsPage: pageNumber,
        favoriteCars: [
          ...(state.favoriteCars ?? []),
          ...favoriteCars.map((favoriteCar) => ({
            ...favoriteCar,
            dailyPrice: favoriteCar.dailyPrice / 100,
          })),
        ],
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
        currentLocation,
      };

    case SET_FILTERS:
      const { payload: filters } = action;
      return {
        ...state,
        filters,
      };

    case GET_FILTERED_CARS:
      const {
        payload: { filteredCars },
      } = action;
      return {
        ...state,
        filteredCars: filteredCars.map((filteredCar) => ({
          ...filteredCar,
          dailyPrice: filteredCar.dailyPrice / 100,
        })),
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
      const carsDetailsMap = new Map(
        carsDetails.map((carDetails) => [
          carDetails.info.id,
          { ...carDetails, dailyPrice: carDetails.dailyPrice / 100 },
        ])
      );

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
        userInfo: {
          ...userLoginData,
          firstName: userLoginData.firstname,
          distanceTravelled: userLoginData.DistanceTravelled,
          balance: userLoginData.balance / 100,
        },
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
      pageNumber = state.paymentsPageEnd
        ? state.paymentsPage
        : !state.paymentsPageEnd && payments.length === 0
          ? state.paymentsPage - 1
          : state.paymentsPage + 1;
      return {
        ...state,
        paymentsPageEnd: !state.paymentsPageEnd ? payments.length === 0 : state.paymentsPageEnd,
        paymentsPage: pageNumber,
        payments: [
          ...(state.payments ?? []),
          ...payments.map((payment) => ({ ...payment, amount: payment.amount / 100 })),
        ],
      };
    case TOP_UP_SUCCESS:
      const { payload: amount } = action;
      // Update the relevant part of your state with the new user data
      return {
        ...state,
        paymentsPage: 0,
        paymentsPageEnd: false,
        userInfo: {
          ...state.userInfo,
          payments: null,
          balance: state.userInfo.balance + amount / 100,
        },
      };
    case FLATLY_LOGIN_SUCCESS:
      return {
        ...state,
        flatlyData: { isLoggedIn: true },
      };
    default:
      return state;
  }
};

export default rootReducer;
