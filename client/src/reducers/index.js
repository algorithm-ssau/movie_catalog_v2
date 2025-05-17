// Этот код создает корневой редюсер (root reducer) для Redux-приложения, используя функцию combineReducers из библиотеки Redux
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';

export default combineReducers({
	movie: movieReducer
});
