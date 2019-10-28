import * as types from './actionTypes';

const REST_API_URL = 'localhost:3333'

export const resetGame = () => dispatch => {
    return dispatch({
        type: types.RESET_GAME
    });
};

export const changeListOrder = () => dispatch => {
    return dispatch({
        type: types.CHANGE_LIST_ORDER
    });
};

export const jumpTo = step => dispatch => {
    return dispatch({
        type: types.JUMP_TO,
        step
    });
};

export const playerMove = (pos, squares) => dispatch => {
    return dispatch({
        type: types.PLAYER_MOVE,
        pos,
        squares
    });
}

export const haveWinner = winLine => dispatch => {
    return dispatch({
        type: types.HAVE_WINNER,
        winLine
    });
}

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
                type: types.LOGIN_SUCCESS,
            });
        }
    }).catch(error => {
        return dispatch({
            type: types.LOGIN_FAILED,
            error
        })
    });
};
