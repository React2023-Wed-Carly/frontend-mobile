import AsyncStorage from '@react-native-async-storage/async-storage';
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
  GET_FLATS,
  GET_FLAT_DETAILS,
  SET_CAR_BOOKING,
  SET_FLAT_BOOKING,
  GET_FLAT_IMAGE,
  GET_FLAT_BOOKING,
  RESET_CARS_LIST,
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
  filters: {
    minPrice: 0,
    maxPrice: 500,
    minSeat: 0,
    maxSeat: 10,
    trans: ['manual', 'automatic'],
  },
  filteredCars: [],
  currentCarBooking: null,
  currentFlatBooking: null,

  payments: null,
  favoriteCars: null,
  rentHistory: null,
  rentHistoryCars: null,

  paymentsPage: 0,
  paymentsPageEnd: false,
  favoriteCarsPage: 0,
  favoriteCarsPageEnd: false,
  rentHistoryPage: 0,
  rentHistoryPageEnd: false,

  carsPage: 0,
  carsPageEnd: false,

  flatsDetails: [],
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
      const { payload: newUnit } = action;
      return {
        ...state,
        unit: newUnit,
      };

    case SET_LOCATION:
      const { payload: newLocation } = action;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          currentLocation: newLocation,
        },
      };
    case RESET_CARS_LIST:
      return {
        ...state,
        carsPage: 0,
        carsPageEnd: false
      }

    case LIKE_CAR:
      const { payload: likedId } = action;
      const car = state.rentHistoryCars.find((item) => item.info.id === likedId);
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
        favoriteCarsPageEnd: !state.favoriteCarsPageEnd
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
      pageNumber = state.carsPageEnd
      ? state.carsPage
      : !state.carsPageEnd && filteredCars.length === 0
        ? state.carsPage - 1
        : state.carsPage + 1;
      return {
        ...state,
        paymentsPage: 0,
        paymentsPageEnd: false,
        carsPageEnd: !state.carsPageEnd
          ? filteredCars.length === 0
          : state.carsPageEnd,
        carsPage: pageNumber,
        filteredCars: filteredCars.map((filteredCar) => ({
          ...filteredCar,
          info: {
            ...filteredCar.info,
            features: filteredCar.info.features.split(','),
            dailyPrice: filteredCar.info.dailyPrice / 100,
          },
        })),
      };

    case GET_RENT_HISTORY:
      const { payload: rentHistory } = action;

      return {
        ...state,
        rentHistory: [...(state.rentHistory ?? []), ...rentHistory],
      };

    case GET_RENT_HISTORY_CARS:
      const { payload: carsDetails } = action;

      const oldRentHistory = state.rentHistory;
      const updatedCarsDetails = carsDetails.map((carDetails) => ({
        ...carDetails,
        info: {
          ...carDetails.info,
          features: carDetails.info.features.split(','),
          dailyPrice: carDetails.info.dailyPrice / 100,
        },
      }));
      const carsDetailsMap = new Map(
        updatedCarsDetails.map((carDetails) => [
          carDetails.info.id,
          {
            ...carDetails,
          },
        ])
      );

      const updatedRentHistory = oldRentHistory.map((historyItem) => ({
        ...historyItem,
        car: carsDetailsMap.get(historyItem.carId),
      }));

      const rentHistoryPageNumber = state.rentHistoryPageEnd
        ? state.rentHistoryPage
        : !state.rentHistoryPageEnd && carsDetails.length === 0
          ? state.rentHistoryPage - 1
          : state.rentHistoryPage + 1;

      var current = updatedRentHistory.find((rent) => {
        const today = new Date();
        const todayISOString = today.toISOString();
        console.log(todayISOString<rent.endDate)
        console.log("rent history")
        return todayISOString < rent.endDate && todayISOString > rent.startDate
      });

      return {
        ...state,
        rentHistoryCars: [...(state.rentHistoryCars ?? []), ...updatedCarsDetails],
        rentHistory: [...(state.rentHistory ?? []), ...updatedRentHistory],
        rentHistoryPage: rentHistoryPageNumber,
        rentHistoryPageEnd: !state.rentHistoryPageEnd
          ? carsDetails.length === 0
          : state.rentHistoryPageEnd,
        currentCarBooking: current
          ? { booking: { ...current}, car: current.car }
          : null,
      };
    case LOGOUT:
      return initialState;
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
    case GET_FLATS:
      const { payload: flats } = action;
      return {
        ...state,
        flats,
      };
    case GET_FLAT_DETAILS:
      const { payload: flatDetails } = action;

      return {
        ...state,
        flatsDetails: [...state.flatsDetails, flatDetails],
      };
    case SET_FLAT_BOOKING:
      const { payload: currentFlatBooking } = action;
      return {
        ...state,
        currentFlatBooking,
      };
    case SET_CAR_BOOKING:
      const { payload: currentCarBooking } = action;
      return {
        ...state,
        currentCarBooking,
      };
    case GET_FLAT_IMAGE:
      const { payload: image } = action;

      const updatedFlats = state.flats.map((flat) => {
        if (flat.id === image.flatId) {
          return {
            ...flat,
            image: image.image,
          };
        }
        return flat; // Jeśli to nie jest mieszkanie do zaktualizowania, zwróć oryginalny obiekt
      });

      return {
        ...state,
        flats: updatedFlats,
      };
    case GET_FLAT_BOOKING:
      const { payload: newFlatBooking } = action;
      console.log(newFlatBooking);
      return {
        ...state,
        currentFlatBooking: newFlatBooking,
      };
    default:
      return state;
  }
};

export default rootReducer;
