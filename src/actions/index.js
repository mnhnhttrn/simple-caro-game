import * as types from './actionTypes';

export const resetGame = () => {
    return {
        type: types.RESET_GAME
    };
};

export const changeListOrder = () => {
    return {
        type: types.CHANGE_LIST_ORDER
    };
};

export const jumpTo = step => {
    return {
        type: types.JUMP_TO,
        step
    };
};

export const playerMove = (pos, squares) => {
    return {
        type: types.PLAYER_MOVE,
        pos,
        squares
    }
}

export const haveWinner = winLine => {
    return {
        type: types.HAVE_WINNER,
        winLine
    }
}