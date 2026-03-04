import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_BUN,
  MOVE_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../actions/burger-ingridients";

const initialState = {
  ingredients: [],
  bun: {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (el) => el.uuid !== action.payload
        ),
      };

    case SET_BUN:
      return { ...state, bun: action.payload };
    case MOVE_INGREDIENT: {
      const { fromIndex, toIndex } = action.payload;

      const updated = [...state.ingredients];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);

      return {
        ...state,
        ingredients: updated,
      };
    }
    case RESET_CONSTRUCTOR:
      return { ...state, ingredients: [], bun: null };
    default:
      return state;
  }
};
