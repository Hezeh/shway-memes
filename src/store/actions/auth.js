import axios from 'axios';
import * as actionTypes from './actionTypes';
import { loginURL, signupURL} from '../../constants';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
}

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const logout = () => {
    localStorage.removeItem('user')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 100000);
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(loginURL, {
            username: username,
            password: password
        })
        .then(res => {
            const user = {
                token: res.data.key,
                // username,
                username: res.data.user,
                author: res.data.author,
                expirationDate: new Date(new Date().getTime() + 360000 * 100000)
            }
            localStorage.setItem("user", JSON.stringify(user))
            dispatch(authSuccess(user))
            dispatch(checkAuthTimeout(360000));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(signupURL, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const user = {
                token: res.data.key,
                // username,
                username: res.data.user,
                author: res.data.author,
                expirationDate: new Date(new Date().getTime() + 360000 * 100000)
            }
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(authSuccess(user))
            dispatch(checkAuthTimeout(360000));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === undefined || user === null) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(user.expirationDate);
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(user))
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            }
        }
    }
}