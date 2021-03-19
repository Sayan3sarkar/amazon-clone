import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    error: null,
    loading: false
};

const authStart = (state, action) => updateObject(state, {
    loading: true, 
    error: null
});

const authSuccess = (state, action) => updateObject(state, {
    loading: false,
    error: null,
    user: action.user
});

const authFail = (state, action) => updateObject(state, {
    error: action.error,
    loading: false
});

const authLogout = (state, action) => updateObject(state, {
    idToken: null,
    user: null
})

const setUser = (state, action) => updateObject(state, {
    user: action.user
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_USER: return setUser(state, action);
        default: return state;
    }
}

export default reducer;