// Этот код представляет собой основной файл приложения (app.js) для веб-сервиса по управлению фильмами. Он настраивает Express-сервер, подключает middleware, устанавливает соединение с MongoDB и определяет роуты.
// Импорт конфигурации из файла config (использует пакет 'config')
const config = require('config');

// Инициализация логгера с пространством имен 'app:log' (использует пакет 'debug')
const log = require('debug')('app:log');

// Импорт необходимых модулей
const express = require('express'); // Фреймворк для создания сервера
const helmet = require('helmet'); // Модуль для установки security-заголовков
const morgan = require('morgan'); // Логгер HTTP-запросов
const fileUpload = require('express-fileupload'); // Middleware для загрузки файлов
const movies = require('./routes/movies'); // Роуты для работы с фильмами

const mongoose = require('mongoose'); // ODM для работы с MongoDB

// Создание экземпляра Express-приложения
const app = express();

// Подключение к MongoDB с использованием URI из конфига
// Опция useNewUrlParser: true для использования нового парсера URL MongoDB
mongoose.connect(config.get('database.uri'), { useNewUrlParser: true })
    .then(() => log(`Successfully connected to MongoDB database on "${config.get('database.uri')}"`))
    .catch((error) => log(`Cannot connect to MongoDB: ${error}`));

// Middleware для установки security-заголовков (защита от распространенных уязвимостей)
app.use(helmet());

// Middleware для парсинга JSON-тела запросов
app.use(express.json());
// Middleware для парсинга URL-encoded данных (extended: true для сложных объектов)
app.use(express.urlencoded({ extended: true }));
// Middleware для обработки загрузки файлов
app.use(fileUpload());

// Настройка логгера HTTP-запросов (формат 'tiny')
// Логи выводятся через наш основной логгер (debug)
app.use(morgan('tiny', { stream: { write: msg => log(msg) } }));

// Подключение роутов для работы с фильмами по префиксу /api/movies/
app.use('/api/movies/', movies);

// Запуск сервера на хосте и порте из конфига
app.listen(config.get('server.port'), config.get('server.host'),
    () => log(`Server is running on ${config.get('server.host')}:${config.get('server.port')}`));

// Экспорт app для тестирования или других модулей
module.exports = app;
