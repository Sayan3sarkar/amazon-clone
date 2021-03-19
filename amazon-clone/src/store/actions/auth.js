import * as actionTypes from './actionTypes';
import { auth } from '../../shared/firebase';
// import axios from 'axios';

export const authStart = ()=> ({
    type: actionTypes.AUTH_START
})

export const authSuccess = user => ({
    type: actionTypes.AUTH_SUCCESS,
    user: user
})

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
})

/**
 *  Action to log a user out
 */
export const logoutAction = () => {
	return{
		type: actionTypes.AUTH_LOGOUT
	}
}

/**
 * Logs a user out
 */
export const logout = history => dispatch => {
    auth.signOut();
    dispatch(logoutAction());
}

/**
 * Login Handler
 * @param {*} email 
 * @param {*} password 
 * @param {*} history 
 * @returns 
 */
export const signIn = (email, password, history) => dispatch => {
    dispatch(authStart());
    auth.signInWithEmailAndPassword(email, password)
    .then(authObj => {
        if(authObj && authObj.user){
            dispatch(authSuccess(authObj.user));
            history.push('/');
        }
    })
    .catch(error => {
        console.log(error.message);
        dispatch(authFail(error.message));
    })
}

/**
 * Sign up handler
 * @param {*} email 
 * @param {*} password 
 * @param {*} history 
 * @returns 
 */
export const signUp = (email, password, history) => dispatch => {
    dispatch(authStart());
    auth.createUserWithEmailAndPassword(email, password)
    .then(authObj => {
        if(authObj && authObj.user){
            dispatch(authSuccess(authObj.user));
            history.push('/');
        }
    })
    .catch(error => {
        console.log(error.message);
        dispatch(authFail(error.message));
    })
}

/**
 * Sets user on app starting. Called in componentDidMount() in App.js. Helps with persistent auth status
 * @param {*} user 
 * @returns 
 */
export const setUser = user => dispatch => {
    dispatch({
        type: actionTypes.SET_USER,
        user: user
    })
}