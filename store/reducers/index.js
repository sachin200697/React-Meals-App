import { combineReducers, createStore } from 'redux';
import mealsReducer from './mealsReducer';

export default createStore( combineReducers( {
    meals: mealsReducer
}));

