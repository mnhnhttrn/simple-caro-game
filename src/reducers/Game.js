import * as types from '../actions/actionTypes';

const initialState = {
    history: [{
        squares: Array(400).fill(null),
        historyPos: -1
    }],
    xIsNext: true,
    isDone: false,
    stepNumber: 0,
    isStepListDesc: false,
    arrowSymbol: '↓',
    winLine: Array(5).fill(null)
}

const caroReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.RESET_GAME:
            return initialState;
        case types.JUMP_TO:
            return {
                ...state,
                stepNumber: actions.step,
                xIsNext: (actions.step % 2) === 0
            };
        case types.CHANGE_LIST_ORDER:
            return {
                ...state,
                isStepListDesc: !state.isStepListDesc,
                arrowSymbol: state.isStepListDesc ? '↓' : '↑'
            };
        case types.PLAYER_MOVE:
            return {
                ...state,
                xIsNext: !state.xIsNext,
                history: state.history.concat([{ squares: actions.squares, historyPos: actions.pos }]),
                stepNumber: state.history.length
            };
        case types.HAVE_WINNER:
            return {
                ...state,
                isDone: true,
                winLine: actions.winLine
            };
        default:
            return state;
    }
}

export default caroReducer;