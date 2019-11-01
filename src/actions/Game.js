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

