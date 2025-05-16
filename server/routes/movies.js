// Этот код представляет собой Express-роутер для работы с фильмами в веб-приложении. Он реализует CRUD-операции (создание, чтение, удаление) и дополнительно поддерживает загрузку фильмов из файла.
// Импорт необходимых модулей
const express = require('express');
// Импорт модели Movie и вспомогательных функций validate и parse из модуля movie
const { Movie, validate, parse } = require('../model/movie');

// Создание роутера Express
const router = express.Router();

// Обработчик GET-запросов на корневой путь роута ('/api/movies/')
// Поддерживает поиск по title, star или возвращает все фильмы с сортировкой
router.get('/', async (request, response) => {
    console.log('request /') // Логирование входящего запроса (лучше использовать debug)
    try {
        let movies;
        // Если есть query-параметр title - ищем по частичному совпадению (регистронезависимо)
        if (request.query.title)
            movies = await Movie.find({
                'title': {
                    '$regex': request.query.title, // Поиск по регулярному выражению
                    '$options': 'i' // Опция 'i' - case insensitive
                }
            });
        // Если есть query-параметр star - ищем по частичному совпадению в массиве stars
        else if (request.query.star)
            movies = await Movie.find({
                'stars': {
                    '$regex': request.query.star,
                    '$options': 'i'
                }
            });
        // Если нет параметров - возвращаем все фильмы с сортировкой по title
        else
            movies = await Movie.find().collation({
                locale: 'en', // Локаль для корректной сортировки
                strength: 3, // Уровень сравнения (3 - учитывает регистр и диакритические знаки)
                caseFirst: 'lower' // Сначала сортирует строчные буквы
            }).sort('title');

        // Отправляем найденные фильмы в формате JSON
        response.json(movies);
    } catch (error) {
        // Обработка ошибок с отправкой статуса 500 и сообщения об ошибке
        response.status(500).send(error.message);
    }
});

// Обработчик POST-запросов для создания нового фильма
router.post('/', async (request, response) => {
    try {
        // Валидация входящих данных с помощью Joi (функция validate)
        const { error } = validate(request.body);

        // Если есть ошибки валидации - возвращаем 400 с сообщением об ошибке
        if (error)
            return (response.status(400).send(error.details[0].message));

        // Создание нового документа Movie
        let movie = new Movie({
            title: request.body.title,
            year: request.body.year,
            format: request.body.format,
            stars: request.body.stars
        });

        // Сохранение фильма в БД и отправка результата
        response.json(await movie.save());
    } catch (error) {
        // Обработка ошибок
        response.status(500).send(error.message);
    }
});

// Обработчик DELETE-запросов для удаления фильма по ID
router.delete('/:id', async (request, response) => {
    try {
        // Поиск и удаление фильма по _id
        const movie = await Movie.findOneAndDelete({ _id: request.params.id });

        // Если фильм не найден - возвращаем 404
        if (!movie)
            return (response.status(404).send('The movie with the given ID was not found'));

        // Отправляем удаленный фильм в ответе
        response.json(movie);
    } catch (error) {
        // Обработка ошибок
        response.status(500).send(error.message);
    }
});

// Обработчик POST-запросов для загрузки фильмов из файла
router.post('/upload', async (request, response) => {
    // Проверка наличия загруженного файла (используется express-fileupload)
    if (!request.files.movies)
        return (response.status(400).send('No file uploaded'));

    try {
        // Парсинг содержимого файла с помощью функции parse
        let movies = await parse(request.files.movies.data.toString().trim());

        // Массовое добавление фильмов в БД и отправка результата
        response.json(await Movie.insertMany(movies));
    } catch(error) {
        // Обработка ошибок парсинга или валидации (возвращаем 400)
        response.status(400).send(error.message);
    }
});

// Экспорт роутера для использования в основном файле приложения
module.exports = router;