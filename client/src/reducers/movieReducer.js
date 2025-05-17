// Этот код представляет собой редюсер (reducer) для управления состоянием фильмов в Redux-приложении. Он обрабатывает различные действия (actions), связанные с загрузкой, добавлением, удалением и поиском фильмов.
// Импортируем типы действий (action types)
import {
  GET_MOVIES,
  ADD_MOVIE,
  UPLOAD_MOVIES,
  DELETE_MOVIE,
  SEARCH_MOVIES_BY_TITLE,
  SEARCH_MOVIES_BY_STAR,
  MOVIES_LOADING
} from '../actions/types';

// Начальное состояние редьюсера
const initialState = {
  movies: [],    // Массив фильмов (изначально пустой)
  loading: false // Флаг загрузки данных (изначально false)
};

// Основная функция редьюсера
export default function(state = initialState, action) {
  switch (action.type) {
    // Обработка получения списка фильмов
    case GET_MOVIES:
      return {
        ...state, // Копируем текущее состояние
        movies: action.payload, // Обновляем массив фильмов
        loading: false // Сбрасываем флаг загрузки
      };

    // Обработка загрузки фильмов из файла
    case UPLOAD_MOVIES:
      return {
        ...state,
        // Добавляем новые фильмы в начало существующего массива
        movies: [...action.payload, ...state.movies],
        loading: false
      };

    // Обработка удаления фильма
    case DELETE_MOVIE:
      return {
        ...state,
        // Фильтруем массив, оставляя все фильмы кроме удаленного
        movies: state.movies.filter((movie) => (movie._id !== action.payload))
      };

    // Обработка добавления нового фильма
    case ADD_MOVIE:
      return {
        ...state,
        // Добавляем новый фильм в начало массива
        movies: [action.payload, ...state.movies]
      };

    // Обработка поиска по названию
    case SEARCH_MOVIES_BY_TITLE:
      return {
        ...state,
        // Заменяем массив фильмов результатами поиска
        movies: action.payload
      };

    // Обработка поиска по актеру
    case SEARCH_MOVIES_BY_STAR:
      return {
        ...state,
        // Заменяем массив фильмов результатами поиска
        movies: action.payload
      };

    // Обработка начала загрузки данных
    case MOVIES_LOADING:
      return {
        ...state,
        loading: true // Устанавливаем флаг загрузки
      };

    // Дефолтный случай - возвращаем текущее состояние
    default:
      return state;
  }
}