import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerIngredientsReducer } from "./burger-ingridients";
import { DetailIngredientReducer } from "./detail-ingredient";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  currentIngredient: DetailIngredientReducer,
  order: orderReducer
});
