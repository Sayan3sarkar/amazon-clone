import * as actionTypes from './actionTypes';

/**
 * Adds an Item to Basket
 * @param {*} item
 */
export const addToBasket = item => dispatch => {
    dispatch({
        type: actionTypes.ADD_TO_BASKET,
        item: item
    });
}

/**
 * Removes an Item from basket
 * @param {*} id
 */
export const removeFromBasket = id => dispatch => {
    dispatch({
        type: actionTypes.REMOVE_FROM_BASKET,
        id: id
    })
}

/** Empties the basket */
export const emptyBasket = () => dispatch => {
    dispatch({
        type: actionTypes.EMPTY_BASKET
    })
}