import * as types from '../actions/actionTypes'

const initialState = {
    error: "",
    isAuthFetched: false,
    isAuthFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_FETCHING: {
            return {
                ...state,
                isAuthFetched: false,
                isAuthFetching: true,
            }
        }
        case types.POST_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthFetched: true,
                isAuthFetching: false
            }
        }
        case types.POST_LOGIN_FAILED: {
            return {
                ...state,
                isAuthFetched: true,
                isAuthFetching: false,
                error: action.error
            }
        }
        case types.FETCH_AUTH: {
            return {
                ...state,
                isAuthFetched: true,
                isAuthFetching: false
            }
        }
        default: {
            return state;
        }
    }
}

export default authReducer;