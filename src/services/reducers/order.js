import {
  GET_IDENTIFIER_FAILED,
  GET_IDENTIFIER_REQUEST,
  GET_IDENTIFIER_SUCCESS,
  REMOVE_IDENTIFIER,
} from "../actions/order";

const initialState = {
  identifier: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IDENTIFIER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_IDENTIFIER_SUCCESS:
      return {
        ...state,
        loading: false,
        identifier: action.payload.order.number,
      };
    case GET_IDENTIFIER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_IDENTIFIER:
        return {
        ...state,
        loading: false,
        identifier: null,
      };
    default:
      return state;
  }
};
