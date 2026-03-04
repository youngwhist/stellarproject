import { REMOVE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../actions/detail-ingredient"

const initialState = {
    currentIngredient: null
}

export const DetailIngredientReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_INGREDIENT:
            return {...state, currentIngredient: action.payload}
        case REMOVE_CURRENT_INGREDIENT:
            return {...state, currentIngredient: null}
        default:
            return state
    }
}