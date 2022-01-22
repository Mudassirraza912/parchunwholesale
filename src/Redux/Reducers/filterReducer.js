import { SEARCHING_ERROR, SEARCHING_FOUND, SEARCHING_START } from "../Constants/constant";

export default function reducer(
    state = {
      searchItems: null,
      fetching: false,
    },
    action
  ) {
    switch (action.type) {
    case SEARCHING_START : {
        return { ...state, fetching: true, };
        }
    case SEARCHING_FOUND: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          searchItems: action.payload,
        };
      }
    case SEARCHING_ERROR: {
      return {
          ...state,
          fetching: false,
          searchItems: null,
      };
    }
    }
    return state;
}