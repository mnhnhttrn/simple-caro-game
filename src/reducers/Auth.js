import * as types from '../actions/actionTypes'

const initialState = {
    error: "",
    isFetched: false,
    isFetching: false,
}

const authReducer = (state = initialState, actions) => {
    switch (actions.types) {
        case types.POST_LOGIN: {
            return {
                ...state,
                isFetched: true,
                isFetching: true,
            }
        }
        case types.POST_LOGIN_FAILED: {
            return
        }
        default: {
            return state;
        }
    }
}

export default authReducer;