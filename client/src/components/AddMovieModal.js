// Этот код представляет собой компонент AddMovieModal - модальное окно для добавления нового фильма в каталог
import React, { Component } from 'react';
import {
    InputGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroupAddon,
    NavLink,
    Container
} from 'reactstrap';

import { connect } from 'react-redux';
import { addMovie } from '../actions/movieActions';

// Компонент модального окна для добавления нового фильма
class AddMovieModal extends Component {
    state = {
        modal: false,       // Видимость модального окна
        title: '',          // Название фильма
        format: 'VHS',      // Формат фильма (по умолчанию VHS)
        year: 1800,         // Год выпуска (по умолчанию 1800)
        stars: ['']         // Список актеров (начальное значение - пустая строка)
    };

    // Переключение видимости модального окна и сброс формы
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            title: '',
            format: 'VHS',
            year: 1800,
            stars: ['']
        });
    };

    // Обработчик изменения названия фильма
    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    // Обработчик изменения года выпуска
    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        })
    };

    // Обработчик изменения формата фильма
    onFormatChange = (event) => {
        this.setState({
            format: event.target.value
        });
    };

    // Обработчик изменения данных об актере
    onStarChange = (event, index) => {
        const stars = this.state.stars;
        stars[index] = event.target.value;

        this.setState({
            stars: stars
        })
    };

    // Добавление нового поля для актера
    addStar = () => {
        this.setState({
            stars: [...this.state.stars, '']
        });
    };

    // Удаление поля актера
    removeStar = (event, index) => {
        event.preventDefault();

        this.state.stars.splice(index, 1);
        this.setState({
            stars: this.state.stars
        });
    };

    // Отправка формы
    onSubmit = e => {
        e.preventDefault();

        // Формируем объект фильма из данных состояния
        const movie = {
            title: this.state.title,
            year: this.state.year,
            format: this.state.format,
            stars: this.state.stars
        };

        // Вызываем action для добавления фильма
        this.props.addMovie(movie)
            .then(() => {
                // Закрываем модальное окно после успешного добавления
                this.setState({
                    modal: false
                });
            })
            .catch((error) => (alert(error.response.data))); // Обработка ошибок
    };

    render() {
        return (
            <Container>
                {/* Ссылка для открытия модального окна */}
                <NavLink
                    className="navigation-link"
                    color="light"
                    onClick={this.toggle}>
                    Add Movie
                </NavLink>

                {/* Модальное окно для добавления фильма */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add Movie
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                {/* Поле для названия фильма */}
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    maxLength="100"
                                    placeholder="Title"
                                    onChange={this.onTitleChange} />

                                {/* Поле для года выпуска */}
                                <Input
                                    id="year"
                                    name="year"
                                    type="number"
                                    required
                                    min="1800"
                                    max="3000"
                                    placeholder="Year"
                                    className="mt-3"
                                    onChange={this.onYearChange} />

                                {/* Выпадающий список форматов */}
                                <Label for="format" className="mt-3">
                                    Format
                                </Label>
                                <Input
                                    type="select"
                                    name="format"
                                    onChange={this.onFormatChange}>
                                    <option>VHS</option>
                                    <option>DVD</option>
                                    <option>Blu-Ray</option>
                                </Input>

                                {/* Список актеров с возможностью добавления/удаления */}
                                <Label className="mt-3">
                                    Stars
                                </Label>
                                {this.state.stars.map((star, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <InputGroup>
                                                <Input
                                                    type="text"
                                                    value={star}
                                                    onChange={(event) => (this.onStarChange(event, index))}
                                                    placeholder="Name & Surname"
                                                    required
                                                    maxLength="100" />
                                                {/* Кнопка удаления актера */}
                                                <InputGroupAddon addonType="append">
                                                    <Button
                                                        color="dark"
                                                        className="fa fa-trash"
                                                        onClick={(event) => (this.removeStar(event, index))} />
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                    )
                                })}

                                {/* Кнопка добавления нового поля для актера */}
                                <Button
                                    color="dark"
                                    outline
                                    block
                                    onClick={this.addStar}>
                                    Add Star
                                </Button>

                                {/* Кнопка отправки формы */}
                                <Button
                                    color="dark"
                                    block
                                    style={{ marginTop: '2rem' }}
                                    type="submit">
                                    Add Movie
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

// Подключение к Redux store
const mapStateToProps = state => ({
    movie: state.movie
});

// Экспорт компонента с подключенным action addMovie
export default connect(
    mapStateToProps,
    { addMovie }
)(AddMovieModal);