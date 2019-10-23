import { combineReducers } from 'redux';
import caroReducer from './Caro';
import authReducer from './Auth';

const mainReducer = combineReducers({
    authReducer,
    caroReducer
});

export default mainReducer;