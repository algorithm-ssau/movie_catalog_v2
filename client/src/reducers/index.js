// Этот код создает корневой редюсер (root reducer) для Redux-приложения, используя функцию combineReducers из библиотеки Redux
// Импортируем функцию combineReducers из Redux
// Она позволяет объединить несколько редьюсеров в один корневой редьюсер
import { combineReducers } from 'redux';

// Импортируем наш редьюсер для работы с фильмами
import movieReducer from './movieReducer';

// Создаем и экспортируем корневой редьюсер приложения
// combineReducers принимает объект, где:
// - ключи - это названия частей состояния (state)
// - значения - соответствующие редьюсеры, управляющие этими частями состояния
export default combineReducers({
  movie: movieReducer // Подключаем редьюсер фильмов под ключом 'movie'
  
  // Здесь можно добавить другие редьюсеры при расширении приложения:
  // user: userReducer,
  // auth: authReducer,
  // и т.д.
});
