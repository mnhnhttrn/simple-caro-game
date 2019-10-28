import { combineReducers } from 'redux';
import caroReducer from './Game';
import authReducer from './Auth';

const mainReducer = combineReducers({
    authReducer,
    caroReducer
});

export default mainReducer;