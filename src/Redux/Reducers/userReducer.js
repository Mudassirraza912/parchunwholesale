import { FETCHING_ERROR, FETCHING_START, CATEGORY_FETCHED, CATEGORY_DATA_FETCHED, SPECIFIC_ITEM_FETCHED, LOGOUT_PROCESSED, VERIFY_PHONE_NUMBER_PROCESSING, VERIFY_PHONE_NUMBER_PROCESSED, VERIFY_PHONE_CODE_PROCESSED, ORDER_FETCHED, BANNER_FETCHED, TC_FETCHED, LOCATION_FETCHED} from "../Constants/constant";

export default function reducer(
  state = {
    userDetails: null,
    category: null,
    categoryDate: null,
    itemDetails: null,
    confirmation: null,
    orders: null,
    banners: [],
    tc: null,
    locations: []
  },
  action
) {
  switch (action.type) {

    case VERIFY_PHONE_CODE_PROCESSED : {
      return { ...state, fetching: false, confirmation: action.payload }
    }

    case VERIFY_PHONE_NUMBER_PROCESSING : {
      return { ...state, fetching: true, };
    }
    case VERIFY_PHONE_NUMBER_PROCESSED : {
      return { ...state, fetching: false, confirmation: action.payload };
    }
    case 'LOGIN_PROCESSING': {
      return { ...state, fetching: true, };
    }
    case 'LOGIN_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userDetails: action.payload,
      };
    }

    case 'LOGOUT_PROCESSING': {
      return { ...state };
    }

    case FETCHING_START: {
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    }

    case FETCHING_ERROR: {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }

    case CATEGORY_FETCHED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        category: action.payload
      };
    }

    case CATEGORY_DATA_FETCHED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        categoryDate: action.payload
      };
    }

    case SPECIFIC_ITEM_FETCHED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        itemDetails: action.payload
      };
    }

    case LOGOUT_PROCESSED : {
      return  {
        ...state,
        userDetails: null,
        itemDetails: null,
        confirmation: null
      }
    }
    case ORDER_FETCHED : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        orders: action.payload
      }
    }
    case BANNER_FETCHED : {
      return {
          ...state,
          banners: action.payload,
          fetching: false
      }
  }

  case TC_FETCHED: {
    return {
      ...state,
      fetching: false,
      fetched: true,
      tc: action.payload
    };
  }
  case LOCATION_FETCHED: {
    return {
      ...state,
      fetching: false,
      fetched: true,
      locations: action.payload
    };
  }

  }
  return state;
}