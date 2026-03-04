import { apiUrl } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    try {
      const res = await fetch(`${apiUrl}/ingredients`);

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error("Ошибка получения ингредиентов");
      }

      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (err) {
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: err.message });
    }
  };
};
