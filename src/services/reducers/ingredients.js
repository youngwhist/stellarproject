import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/ingredients";

const initialState = {
  items: [],
  loading: false,
  error: null
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
