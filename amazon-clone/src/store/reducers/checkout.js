import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    basket: []
};

const addToBasket = (state, action)=> updateObject(state, {basket: [...state.basket, action.item]});

const removeFromBasket = (state, action) => {
    const index = state.basket.findIndex( item => item.id === action.id);
    let newBasket = [...state.basket];
    if(index >= 0) {
        newBasket.splice(index, 1);
    } else {
        console.warn(`can't remove Product (id: ${action.id}) as it's not in the basket`)
    }
    return updateObject(state, {basket: newBasket});
}

const emptyBasket = (state, action) => updateObject(state, {basket: []})

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_BASKET: return addToBasket(state, action);
        case actionTypes.REMOVE_FROM_BASKET: return removeFromBasket(state, action);
        case actionTypes.EMPTY_BASKET: return emptyBasket(state, action);
        default: return state;
    }
}

export default reducer;