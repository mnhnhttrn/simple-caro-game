import { combineReducers } from 'redux';
import caroReducer from './Caro';

const mainReducer = combineReducers({
    caroReducer
});

export default mainReducer;