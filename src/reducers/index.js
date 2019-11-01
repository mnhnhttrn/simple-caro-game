import { combineReducers } from 'redux';
import gameReducer from './Game';
import authReducer from './Auth';

const mainReducer = combineReducers({
    authReducer,
    gameReducer
});

export default mainReducer;