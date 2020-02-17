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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
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
                username,
                userId: res.data.user,
                expirationDate: new Date(new Date().getTime() + 360000 * 100000)
            }
            localStorage.setItem("user", JSON.stringify(user))
            // const token = res.data.key;
            // const expirationDate = new Date(new Date().getTime() + 360000 * 100000);
            // localStorage.setItem('token', token);
            // localStorage.setItem('expirationDate', expirationDate);
            // dispatch(authSuccess(token));
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
                username,
                userId: res.data.user,
                expirationDate: new Date(new Date().getTime() + 360000 * 100000)
            }
            // const token = res.data.key;
            // const expirationDate = new Date(new Date().getTime() + 360000 * 100000);
            // localStorage.setItem('token', token);
            // localStorage.setItem('expirationDate', expirationDate);
            // dispatch(authSuccess(token));
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
        // const token = localStorage.getItem('token');
        // if (token === undefined) {
        //     dispatch(logout());
        // } else {
        //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
        //     if ( expirationDate <= new Date() ) {
        //         dispatch(logout());
        //     } else {
        //         dispatch(authSuccess(token));
        //         dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ) );
        //     }
        // }
    }
}