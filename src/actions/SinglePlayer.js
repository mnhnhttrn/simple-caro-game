import * as types from './actionTypes';

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

export const jumpTo = (step, history) => dispatch => {
    let isDone = false
    if (step === history.length - 1) {
        isDone = true
    }
    return dispatch({
        type: types.JUMP_TO,
        step,
        isDone
    });
};

export const playerMove = history => (dispatch, getState) => {
    return dispatch({
        type: types.PLAYER_MOVE,
        history
    });
}

export const haveWinner = winLine => dispatch => {
    return dispatch({
        type: types.HAVE_WINNER,
        winLine
    });
}

