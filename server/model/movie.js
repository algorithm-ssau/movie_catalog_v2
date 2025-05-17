// Этот код представляет собой модуль для работы с фильмами в Node.js-приложении, использующий MongoDB для хранения данных и Joi для их валидации.

// Импорт необходимых библиотек
const Joi = require('joi'); // Библиотека для валидации данных
const mongoose = require('mongoose'); // ODM для работы с MongoDB

// Допустимые форматы фильмов
const formats = ['VHS', 'DVD', 'Blu-Ray'];

// Создание модели Movie с помощью Mongoose
const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true, // Обязательное поле
        maxlength: 100 // Максимальная длина названия
    },
    year: {
        type: Number,
        required: true,
        min: 1800, // Минимальный год
        max: 3000  // Максимальный год
    },
    format: {
        type: String,
        required: true,
        enum: formats // Должен быть одним из значений массива formats
    },
    stars: {
        type: [{
            type: String,
            maxlength: 100 // Максимальная длина имени актера
        }],
        required: true // Хотя бы один актер должен быть указан
    }
}));

// Функция валидации объекта фильма с использованием Joi
const validate = (movie) => {
    const schema = Joi.object({
        title: Joi.string().max(100).required(),
        year: Joi.number().min(1800).max(3000).required(),
        format: Joi.string().valid(...formats).required(), // Проверка на допустимые форматы
        stars: Joi.array().items(Joi.string().max(100)).min(1).required() // Массив строк, минимум 1 элемент
    });

    return schema.validate(movie); // Возвращает результат валидации
};

// Функция для парсинга файла с фильмами
const parse = (file) => {
    return new Promise(((resolve) => {
        let moviesArray = [];
        
        // Нормализация переносов строк и разделение на отдельные фильмы
        let movies = file.replace(/(\r\n|\n|\r)/gm, '\n').split(/^\s*\n/gm);
        
        // Регулярное выражение для разбора информации о фильме
        let pattern = /Title:\s*(.+?)\s*\nRelease Year:\s*(\d{4})\s*\nFormat:\s*(VHS|DVD|Blu-Ray)\s*\nStars:\s*(.*)/;

        // Обработка каждого блока с информацией о фильме
        movies.forEach((str) => {
            if (pattern.test(str)) {
                const result = pattern.exec(str);

                // Создание объекта фильма из данных файла
                const movie = {
                    title: result[1],
                    year: parseInt(result[2], 10), // Преобразование года в число
                    format: result[3],
                    stars: result[4].split(', ').map((name) => (name.trim())) // Разделение актеров по запятой
                };

                // Валидация распарсенного фильма
                const { error } = validate(movie);

                if (error)
                    throw new Error('Invalid file'); // Если ошибка валидации

                moviesArray.push(movie); // Добавление валидного фильма в массив
            } else {
                throw new Error('Invalid file'); // Если формат не соответствует шаблону
            }
        });
        resolve(moviesArray); // Возвращаем массив фильмов
    }));
};

// Экспорт модели и функций
module.exports = {
    Movie,
    validate,
    parse
};
