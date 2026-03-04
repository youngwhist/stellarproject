import { apiUrl } from "../../utils/constants";

export const GET_IDENTIFIER_REQUEST = "GET_IDENTIFIER_REQUEST";
export const GET_IDENTIFIER_SUCCESS = "GET_IDENTIFIER_SUCCESS";
export const GET_IDENTIFIER_FAILED = "GET_IDENTIFIER_FAILED";
export const REMOVE_IDENTIFIER = "REMOVE_IDENTIFIER";

export const getOrder = (idObj) => {
  return async (dispatch) => {
    dispatch({ type: GET_IDENTIFIER_REQUEST });

    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(idObj),
      });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error("Ошибка создания заказа");
      }

      dispatch({ type: GET_IDENTIFIER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_IDENTIFIER_FAILED, payload: err.message });
    }
  };
};
