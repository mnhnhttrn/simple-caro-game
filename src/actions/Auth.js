import axios from 'axios'
import Cookie from 'js-cookie'
import * as types from '../actions/actionTypes'
import { REST_API_BASE_URL } from '../config/general'
const ACCESS_TOKEN_COOKIE_KEY = 'access_token'

const isAuthenticated = isFetched => {
    return Cookie.get(ACCESS_TOKEN_COOKIE_KEY) && isFetched
}

const shouldAuth = state => {
    if (state.isFetching || (!Cookie.get(ACCESS_TOKEN_COOKIE_KEY))) {
        return false
    }
    return true
}

export const authToken = () => async (dispatch, getState) => {
    if (shouldAuth(getState())) {
        dispatch({ type: types.AUTH_FETCHING })
        const url = '/profile'
        let accessToken = 'Bearer ' + Cookie.get(ACCESS_TOKEN_COOKIE_KEY)
        return axios.get(url, {
            headers: {
                Authorization: accessToken
            },
            baseURL: REST_API_BASE_URL
        }).then(response => {
            dispatch({
                type: types.FETCH_AUTH,
                profilePayload: response.data.profilePayload
            })
            if (isAuthenticated(getState())) {
                return true
            } else {
                return false
            }
        }).catch(error => {
            let errorMsg = ""
            if (!error.response) {
                errorMsg = 'Lỗi kết nối mạng!';
            } else {
                errorMsg = error.response.data.message.message;
                if (Cookie.get(ACCESS_TOKEN_COOKIE_KEY)) {
                    Cookie.remove(ACCESS_TOKEN_COOKIE_KEY)
                }
            }
            dispatch({
                type: types.FETCH_AUTH,
                error: errorMsg
            })
            return false
        })
    } else {
        return false
    }
}

export const postLogin = loginPayload => dispatch => {
    const url = '/user/login'
    dispatch({ type: types.AUTH_FETCHING })
    return axios.post(url, loginPayload, {
        baseURL: REST_API_BASE_URL
    }).then(response => {
        Cookie.set(ACCESS_TOKEN_COOKIE_KEY, response.data.token)
        return (dispatch({
            type: types.POST_LOGIN_SUCCESS,
        }))
    }).catch(error => {
        let errorMsg = ""
        if (!error.response) {
            errorMsg = 'Lỗi kết nối mạng!';
        } else {
            errorMsg = error.response.data.message.message;
            if (Cookie.get(ACCESS_TOKEN_COOKIE_KEY)) {
                Cookie.remove(ACCESS_TOKEN_COOKIE_KEY)
            }
        }
        return (dispatch({
            type: types.POST_LOGIN_FAILED,
            error: errorMsg
        }))
    })
};

export const postSignup = signupPayload => dispatch => {
    const url = '/user/register'
    dispatch({ type: types.AUTH_FETCHING })
    return axios.post(url, signupPayload, {
        baseURL: REST_API_BASE_URL
    }).then(response => {
        Cookie.set(ACCESS_TOKEN_COOKIE_KEY, response.data.token)
        return (dispatch({
            type: types.POST_LOGIN_SUCCESS,
        }))
    }).catch(error => {
        let errorMsg = ""
        if (!error.response) {
            errorMsg = 'Lỗi kết nối mạng!';
        } else {
            errorMsg = error.response.data.message.message;
            if (Cookie.get(ACCESS_TOKEN_COOKIE_KEY)) {
                Cookie.remove(ACCESS_TOKEN_COOKIE_KEY)
            }
        }
        return (dispatch({
            type: types.POST_LOGIN_FAILED,
            error: errorMsg
        }))
    })
};
