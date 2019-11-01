import axios from 'axios'
import Cookie from 'js-cookie'
import * as types from '../actions/actionTypes'
import { REST_API_BASE_URL } from '../config/general'
const ACCESS_TOKEN_COOKIE_KEY = 'access_token'

const fetchAuth = () => dispatch => {
    const url = '/me'
    let accessToken = 'Bearer ' + Cookie.get(ACCESS_TOKEN_COOKIE_KEY)
    return axios.get(url, {
        headers: {
            Authorization: accessToken
        },
        baseURL: REST_API_BASE_URL
    }).then(response => {
        if (response.data)
            console.log(response.data)
        return (dispatch({
            type: types.FETCH_AUTH
        }))
    }).catch(error => {
        if (error.response)
            console.log(error.response)
        if (Cookie.get(ACCESS_TOKEN_COOKIE_KEY)) {
            Cookie.remove(ACCESS_TOKEN_COOKIE_KEY)
        }
        return (dispatch({
            type: types.FETCH_AUTH
        }))
    })
}
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
        await fetchAuth()
    }
    console.log(REST_API_BASE_URL)
    if (isAuthenticated(getState())) {
        return true
    } else {
        return false
    }
}

export const postLogin = (loginPayload) => dispatch => {
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
        if (error.data && error.data.response) {
            console.log(error.data.response)
        }
        if (Cookie.get(ACCESS_TOKEN_COOKIE_KEY)) {
            Cookie.remove(ACCESS_TOKEN_COOKIE_KEY)
        }
        return (dispatch({
            type: types.POST_LOGIN_FAILED
        }))
    })

};
