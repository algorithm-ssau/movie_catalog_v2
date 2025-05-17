# Movie Catalog

# Каталог фильмов

Каталог фильмов разработан с использованием технологий MongoDB, Express.js, React.js и Node.js (MERN-стек).

## Установка

Клонируйте репозиторий и установите зависимости:

```
$ git clone <url репозитория> <название папки>
$ cd <название папки>/client
$ npm i
$ cd ../server
$ npm i
```

## Настройка

Необходимо настроить несколько файлов под ваше окружение.

1. Измените файл `server/config/default.json`
2. При необходимости измените строку в `client/package.json`:
```
"proxy": "http://localhost:5000"
```

## Запуск

Запустите серверную и клиентскую части проекта:

```
$ cd server
$ npm start
```

Для вывода отладочных сообщений установите переменную окружения `DEBUG`:

```
$ DEBUG=app:* npm start
```

## Тестирование

Доступны тесты для серверной части проекта.

Тесты находятся в папке `server/test`. Запустите их командой:

```
$ npm test
```

## Фильмы

### Структура

Поле|Тип данных|Обязательное|Ограничения
:-----|:-----|:-----|:-----
`title`|Строка|Да|Не длиннее 100 символов
`year`|Число|Да|От 1800 до 3000 года
`format`|Строка|Да|`VHS`, `DVD` или `Blu-Ray`
`stars`|Массив строк|Да|Каждая строка не длиннее 100 символов, минимум 1 элемент

### Схема данных

```
const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    year: {
        type: Number,
        required: true,
        min: 1800,
        max: 3000
    },
    format:  {
        type: String,
        required: true,
        enum: formats
    },
    stars: {
        type: [{
            type: String,
            maxlength: 100
        }],
        required: true
    }
}));
```

### Валидация на сервере

Для валидации данных используется модуль Joi:

```
const validate = (movie) => {
    const schema = {
        title: Joi.string().max(100).required(),
        year: Joi.number().min(1800).max(3000).required(),
        format: Joi.string().valid(formats).required(),
        stars: Joi.array().items(Joi.string().max(100)).min(1).required()
    };

    return (Joi.validate(movie, schema));
};
```

### Валидация на клиенте

На клиентской стороне используется валидация форм:


## Архитектура

### Серверная часть

Используемые технологии:
- Express.js для обработки HTTP-запросов
- Mongoose для работы с MongoDB

#### RESTful API

URL|HTTP Метод|Тело запроса|Ответ
:-----|:-----|:-----|:-----
`/api/movies`|`GET`|—|Все фильмы
`/api/movies?title=<название>`|`GET`|—|Фильмы по названию
`/api/movies?star=<актер>`|`GET`|—|Фильмы по актеру
`/api/movies`|`POST`|JSON|Созданный фильм
`/api/movies/upload`|`POST`|Файл|Все созданные фильмы
`/api/movies/:id`|`DELETE`|—|Удаленный фильм

### Клиентская часть

Используемые технологии:
- React.js
- Redux
- Bootstrap
