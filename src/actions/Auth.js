import * as types from '../actions/actionTypes'
import { REST_API_URL } from '../config/general'

export const postLogin = ({ Username, Password }) => dispatch => {
    fetch(REST_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Username, Password })
    }).then(response => {
        if (!response.ok) {
            return dispatch({
                type: types.POST_LOGIN_SUCCESS,
            });
        }
    }).catch(error => {
        return dispatch({
            type: types.POST_LOGIN_FAILED,
            error
        })
    });
};
