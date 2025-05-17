// Этот код представляет собой набор тестов для API работы с фильмами, написанный с использованием Chai и Chai HTTP. Он проверяет корректность работы GET и POST запросов к /api/movies/.

// Импорт необходимых модулей
let { Movie } = require('../model/movie'); // Модель Movie из Mongoose
let chai = require('chai'); // Библиотека для assertions
let chaiHttp = require('chai-http'); // Плагин для тестирования HTTP-запросов
let server = require('../server'); // Серверное приложение
let should = chai.should(); // Стиль assertions через should

chai.use(chaiHttp); // Подключаем chai-http плагин к chai

// Основной блок тестов для работы с фильмами
describe('Movies', () => {

    // Перед каждым тестом очищаем коллекцию Movie в базе данных
    beforeEach((done) => {
        Movie.deleteMany({}, (error) => {
            done();
        });
    });

    // Тесты для GET /api/movies/ - получение всех фильмов
    describe('/GET /api/movies/', () => {
        it('It should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies/')
                .end((error, response) => {
                    response.should.have.status(200); // Проверяем код ответа
                    response.body.should.be.a('array'); // Ответ должен быть массивом
                    response.body.length.should.be.eql(0); // Массив должен быть пустым (так как база очищена)
                    done();
                });
        });
    });

    // Тесты для POST /api/movies/ - создание нового фильма
    describe('/POST /api/movies/', () => {
        it('It should POST a movie ', (done) => {
            // Тестовые данные фильма
            let movie = {
                title: 'The Girl with Dragon Tattoo',
                year: 2011,
                format: 'Blu-Ray',
                stars: [
                    "Daniel Craig",
                    "Rooney Mara",
                    "Christopher Plummer"
                ]
            };

            chai.request(server)
                .post('/api/movies/')
                .send(movie) // Отправляем данные фильма
                .end((error, response) => {
                    response.should.have.status(200); // Проверяем код ответа
                    response.body.should.be.a('object'); // Ответ должен быть объектом
                    // Проверяем наличие обязательных полей в ответе
                    response.body.should.have.property('_id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('year');
                    response.body.should.have.property('format');
                    response.body.should.have.property('stars');
                    done();
                });
        });
    });

    // После каждого теста снова очищаем коллекцию Movie
    afterEach((done) => {
        Movie.deleteMany({}, (error) => {
            done();
        });
    });
});