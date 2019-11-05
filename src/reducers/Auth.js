import * as types from '../actions/actionTypes'

const initialState = {
    profilePayload: {
        username: "user",
        avatarURL: ""
    },
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
                isAuthFetching: false,
                profilePayload: action.profilePayload,
                error: ""
            }
        }
        case types.POST_LOGIN_FAILED: {
            return {
                ...state,
                isAuthFetched: true,
                isAuthFetching: false,
                profilePayload: {},
                error: action.error
            }
        }
        case types.FETCH_AUTH: {
            return {
                ...state,
                isAuthFetched: true,
                isAuthFetching: false,
                error: action.error,
                profilePayload: action.profilePayload
            }
        }
        case types.RESET_AUTH: {
            return {
                state: initialState
            }
        }
        default: {
            return state;
        }
    }
}

export default authReducer;