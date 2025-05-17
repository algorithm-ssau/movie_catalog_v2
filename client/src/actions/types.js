// Это файл с определениями типов действий (action types) для Redux
// Типы действий для работы с фильмами

// Получение списка фильмов
export const GET_MOVIES = 'GET_MOVIES';

// Добавление нового фильма
export const ADD_MOVIE = 'ADD_MOVIE';

// Массовая загрузка фильмов (из файла)
export const UPLOAD_MOVIES = 'UPLOAD_MOVIES';

// Удаление фильма
export const DELETE_MOVIE = 'DELETE_MOVIE';

// Поиск фильмов по названию
export const SEARCH_MOVIES_BY_TITLE = 'SEARCH_MOVIES_BY_TITLE';

// Поиск фильмов по имени актера
export const SEARCH_MOVIES_BY_STAR = 'SEARCH_MOVIES_BY_STAR';

// Состояние загрузки данных о фильмах
export const MOVIES_LOADING = 'MOVIES_LOADING';