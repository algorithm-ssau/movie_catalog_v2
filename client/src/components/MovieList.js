// Этот код представляет собой компонент MovieList, который отображает список фильмов с возможностью поиска, удаления и просмотра деталей. Компонент подключен к Redux для управления состоянием
import React, { Component } from 'react';
import {
  Container,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

// Импорт действий Redux
import {
  getMovies,
  deleteMovie,
  searchMoviesByTitle,
  searchMoviesByStar
} from '../actions/movieActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css'; // Иконки Font Awesome

// Компонент списка фильмов
class MovieList extends Component {
  state = {
    query: '',     // Текст поискового запроса
    type: 'Title', // Тип поиска (по названию или актеру)
    modal: false,  // Видимость модального окна
    movie: null    // Выбранный фильм для просмотра
  };

  // Переключение видимости модального окна
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // Загрузка фильмов при монтировании компонента
  componentDidMount() {
    this.props.getMovies();
  }

  // Удаление фильма по ID
  onDeleteClick = id => {
    this.props.deleteMovie(id);
  };

  // Просмотр деталей фильма
  onViewClick = (movie) => {
    this.setState({
      modal: true,
      movie: movie
    });
  };

  // Поиск фильмов
  search = (type, query) => {
    if (query !== '') {
      if (type === 'Title')
        this.props.searchMoviesByTitle(query); // Поиск по названию
      else
        this.props.searchMoviesByStar(query); // Поиск по актеру
    } else {
      this.props.getMovies(); // Если запрос пустой - загружаем все фильмы
    }
  };

  // Обработчик изменения типа поиска
  handleSelectChange = (event) => {
    this.setState({
      type: event.target.value
    });
    this.search(event.target.value, this.state.query);
  };

  // Обработчик изменения текста поиска
  handleInputChange = (event) => {
    this.setState({
      query: event.target.value
    });
    this.search(this.state.type, event.target.value);
  };

  // Обработчик отправки формы (предотвращаем стандартное поведение)
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const movies = this.props.movie.movies;

    // Сортировка фильмов по названию
    movies.sort((a, b) => (a.title.localeCompare(b.title)));

    return (
      <div>
        {/* Форма поиска */}
        <Form
          className="mt-4 mb-4"
          onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {/* Выбор типа поиска */}
              <Input
                type="select"
                name="select"
                onChange={this.handleSelectChange}>
                <option>Title</option>
                <option>Star</option>
              </Input>
            </InputGroupAddon>
            {/* Поле ввода поискового запроса */}
            <Input
              value={this.state.query}
              placeholder={
                (this.state.type === 'Title') 
                  ? 'The Girl with the Dragon Tattoo' 
                  : 'Daniel Craig'
              }
              name="search"
              onChange={this.handleInputChange} />
          </InputGroup>
        </Form>

        {/* Список фильмов */}
        <Container className="d-flex flex-row flex-wrap mt-3">
          {movies.map((movie) => (
            <Card
              className="col-md-3 mb-3"
              key={movie._id}>
              {/* Заглушка для постера */}
              <CardImg
                top
                width="100%"
                src="/poster.svg"
                alt="Card image cap"/>
              <CardBody>
                <CardTitle>
                  {movie.title} {/* Название фильма */}
                </CardTitle>
                <CardSubtitle className="text-secondary">
                  {movie.year} {/* Год выпуска */}
                </CardSubtitle>
                {/* Кнопки действий */}
                <div style={{
                  zIndex: 2,
                  position: 'absolute',
                  right: '0.5rem',
                  top: '0.75rem'
                }}>
                  {/* Кнопка просмотра */}
                  <Button
                    color="dark"
                    size="sm"
                    className="fa fa-eye"
                    onClick={this.onViewClick.bind(this, movie)}
                    block/>
                  {/* Кнопка удаления */}
                  <Button
                    color="dark"
                    size="sm"
                    className="fa fa-trash"
                    onClick={this.onDeleteClick.bind(this, movie._id)}
                    block/>
                </div>
              </CardBody>
            </Card>
          ))}
        </Container>

        {/* Модальное окно с деталями фильма */}
        {this.state.modal && this.state.movie &&
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              {this.state.movie.title}
            </ModalHeader>
            <ModalBody>
              <p>
                <span className="font-weight-bold">Year: </span>
                {this.state.movie.year}
              </p>
              <p>
                <span className="font-weight-bold">Format: </span>
                {this.state.movie.format}
              </p>
              <p className="font-weight-bold">
                Stars:
              </p>
              <ul>
                {this.state.movie.stars.map((star, index) => (
                  <li key={index}>
                    {star}
                  </li>
                ))}
              </ul>
            </ModalBody>
          </Modal>
        }
      </div>
    )
  }
}

// Проверка типов пропсов
MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};

// Подключение к Redux store
const mapStateToProps = state => ({
  movie: state.movie,
  query: state.query
});

// Экспорт компонента с подключенными действиями
export default connect(
  mapStateToProps,
  { getMovies, searchMoviesByTitle, searchMoviesByStar, deleteMovie }
)(MovieList);