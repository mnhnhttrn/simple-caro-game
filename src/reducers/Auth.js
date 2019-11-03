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
                profilePayload: {},
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
        default: {
            return state;
        }
    }
}

export default authReducer;