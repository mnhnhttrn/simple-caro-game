import * as types from '../actions/actionTypes';

const initialState = {
    history: [{
        squares: Array(400).fill(null),
        historyPos: -1
    }],
    xIsNext: true,
    isDone: false,
    stepNumber: 0,
    isStepListDesc: true,
    winLine: Array(5).fill(null)
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RESET_GAME:
            return initialState;
        case types.JUMP_TO:
            return {
                ...state,
                stepNumber: action.step,
                isDone: action.isDone,
                xIsNext: (action.step % 2) === 0
            };
        case types.CHANGE_LIST_ORDER:
            return {
                ...state,
                isStepListDesc: !state.isStepListDesc
            };
        case types.PLAYER_MOVE:
            return {
                ...state,
                xIsNext: !state.xIsNext,
                history: action.history,
                stepNumber: action.history.length - 1
            };
        case types.HAVE_WINNER:
            return {
                ...state,
                isDone: true,
                winLine: action.winLine
            };
        default:
            return state;
    }
}

export default gameReducer;