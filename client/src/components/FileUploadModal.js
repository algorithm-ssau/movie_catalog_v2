// Этот код представляет собой компонент FileUploadModal, который реализует функциональность загрузки файлов с фильмами в React-приложении с использованием Redux
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Container
} from 'reactstrap';

import { uploadMovies } from '../actions/movieActions';
import { connect } from 'react-redux';

// Компонент модального окна для загрузки файлов с фильмами
class FileUploadModal extends Component {
  state = {
    modal: false,          // Видимость модального окна
    file: null,           // Выбранный файл
    label: 'Choose file', // Текст для кнопки выбора файла
    alertIsOpen: false,   // Видимость уведомления
    alertColor: null,     // Цвет уведомления (success/danger)
    alertText: ''         // Текст уведомления
  };

  // Переключение видимости модального окна и сброс состояния
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      file: null,
      label: 'Choose file',
      alertIsOpen: false
    });
  };

  // Обработчик выбора файла
  onFileSelect = event => {
    this.setState({
      file: event.target.files[0], // Сохраняем выбранный файл
      label: event.target.files[0].name // Обновляем текст кнопки
    })
  };

  // Обработчик загрузки файла
  onFileUpload = () => {
    if (this.state.file) {
      // Создаем объект FormData для отправки файла
      const data = new FormData();
      data.append('movies', this.state.file, this.state.file.name);

      // Формируем объект файла для отправки
      const file = {
        entity: this.state.file,
        name: this.state.file.name
      };

      // Вызываем action для загрузки файла
      this.props.uploadMovies(file)
        .then(() => (this.setState({
          alertIsOpen: true,
          alertColor: 'success',
          alertText: 'Successfully uploaded' // Успешная загрузка
        })))
        .catch((error) => (this.setState({
          alertIsOpen: true,
          alertColor: 'danger',
          alertText: error.response.data // Ошибка загрузки
        })));
    }
  };

  render() {
    return (
      <Container>
        {/* Ссылка для открытия модального окна */}
        <NavLink
          className="navigation-link"
          color="light"
          onClick={this.toggle}>
          Upload File
        </NavLink>

        {/* Модальное окно загрузки файла */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            File Upload
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                {/* Поле выбора файла */}
                <CustomInput
                  type="file"
                  name="movies"
                  id="moviesFileUpload"
                  onChange={this.onFileSelect}
                  label={this.state.label} // Динамическая подпись
                />
                
                {/* Кнопка загрузки файла */}
                <Button
                  className="mt-3"
                  onClick={this.onFileUpload}
                  color="dark"
                  block>
                  Upload
                </Button>
                
                {/* Уведомление о результате операции */}
                <Alert
                  className="mt-3"
                  color={this.state.alertColor}
                  isOpen={this.state.alertIsOpen}>
                  {this.state.alertText}
                </Alert>
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
  file: state.file
});

// Экспорт компонента с подключенным action uploadMovies
export default connect(
  mapStateToProps,
  { uploadMovies }
)(FileUploadModal);