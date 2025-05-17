// Это файл с action creators для работы с фильмами в Redux-приложении. Он содержит функции для взаимодействия с API и диспатча соответствующих действий
import axios from 'axios';

// Импортируем типы действий
import {
  GET_MOVIES,
  ADD_MOVIE,
  UPLOAD_MOVIES,
  DELETE_MOVIE,
  SEARCH_MOVIES_BY_TITLE,
  SEARCH_MOVIES_BY_STAR,
  MOVIES_LOADING
} from './types';

// Действие для получения списка фильмов
export const getMovies = () => (dispatch) => {
  dispatch(setItemsLoading()); // Устанавливаем состояние загрузки

  return axios.get('/api/movies')
    .then(res =>
      dispatch({
        type: GET_MOVIES,     // Тип действия
        payload: res.data     // Данные из ответа сервера
      })
    );
};

// Действие для добавления нового фильма
export const addMovie = (movie) => (dispatch) => {
  return axios.post('/api/movies/', movie)
    .then(res =>
      dispatch({
        type: ADD_MOVIE,      // Тип действия
        payload: res.data     // Данные добавленного фильма
      })
    );
};

// Действие для удаления фильма по ID
export const deleteMovie = (id) => (dispatch) => {
  axios.delete(`/api/movies/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_MOVIE,   // Тип действия
        payload: id           // ID удаленного фильма
      })
    );
};

// Действие для загрузки списка фильмов из файла
export const uploadMovies = (file) => (dispatch) => {
  dispatch(setItemsLoading()); // Устанавливаем состояние загрузки

  // Создаем FormData для отправки файла
  const data = new FormData();
  data.append('movies', file.entity, file.name);

  return axios.post('/api/movies/upload', data)
    .then(res =>
      dispatch({
        type: UPLOAD_MOVIES,  // Тип действия
        payload: res.data     // Данные загруженных фильмов
      }));
};

// Действие для поиска фильмов по названию
export const searchMoviesByTitle = (title) => (dispatch) => {
  dispatch(setItemsLoading()); // Устанавливаем состояние загрузки

  axios.get(`/api/movies/?title=${title}`)
    .then(res =>
      dispatch({
        type: SEARCH_MOVIES_BY_TITLE, // Тип действия
        payload: res.data             // Результаты поиска
      }));
};

// Действие для поиска фильмов по актеру
export const searchMoviesByStar = (star) => (dispatch) => {
  dispatch(setItemsLoading()); // Устанавливаем состояние загрузки

  axios.get(`/api/movies/?star=${star}`)
    .then(res =>
      dispatch({
        type: SEARCH_MOVIES_BY_STAR, // Тип действия
        payload: res.data            // Результаты поиска
      }));
};

// Действие для установки состояния загрузки
export const setItemsLoading = () => {
  return {
    type: MOVIES_LOADING  // Тип действия (без payload)
  };
};