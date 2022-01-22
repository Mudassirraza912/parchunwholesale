import { CART_FETCHED, EMPTY_PROMO, FEATURED_PRODUCT_FETCHED, LOGOUT_PROCESSED, PRICE_CHECKER_UPDATE, PROMO_APPLIED } from "../Constants/constant";

export default function reducer(
    state = {
      cartItems: null,
      featureProduct: [],
      checkerUpdate: null,
      appliedPromo: null
    },
    action
  ) {
    switch (action.type) {
      case CART_FETCHED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          cartItems: action.payload,
        };
      }
    case LOGOUT_PROCESSED : {
      return {
        cartItems: null,
      }
    }
    case FEATURED_PRODUCT_FETCHED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        featureProduct: action.payload,
      };
    }
    case PRICE_CHECKER_UPDATE : {
      return {
        ...state,
        checkerUpdate: action.payload
      }
    }
    case PROMO_APPLIED : {
      return {
        ...state,
        appliedPromo: action.payload
      }
    }
    case EMPTY_PROMO : {
      return {
        ...state,
        appliedPromo: null
      }
    }
    }
    return state;
  }