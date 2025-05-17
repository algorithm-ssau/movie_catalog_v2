// Этот код представляет собой компонент AppNavBar - навигационную панель приложения для каталога фильмов
import React, { Component } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse
} from 'reactstrap';

// Импортируем компоненты модальных окон
import AddMovieModal from './AddMovieModal';
import FileUploadModal from './FileUploadModal';

// Компонент навигационной панели приложения
class AppNavBar extends Component {
  state = {
    isOpen: false // Состояние для управления раскрытием меню (для мобильных устройств)
  };

  // Метод для переключения состояния меню
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar
        color="dark"  // Темный цвет фона
        dark          // Светлый текст (для темного фона)
        expand="sm"   // Расширять на устройствах ≥ small (576px)
      >
        <Container>  {/* Контейнер для выравнивания содержимого */}
          {/* Логотип/название приложения */}
          <NavbarBrand
            className="font-weight-bold"  // Жирный шрифт
            href="/"                      // Ссылка на главную страницу
          >
            Movie Catalog
          </NavbarBrand>
          
          {/* Кнопка-гамбургер для мобильных устройств */}
          <NavbarToggler
            onClick={this.toggle}  // Обработчик клика
          />
          
          {/* Сворачиваемое содержимое навигации */}
          <Collapse
            isOpen={this.state.isOpen}  // Управление видимостью
            navbar                     // Специальный флаг для Navbar
          >
            {/* Навигационное меню */}
            <Nav
              className="ml-auto"  // Выравнивание по правому краю
              navbar               // Специальный флаг для Navbar
            >
              {/* Пункт меню - модальное окно добавления фильма */}
              <NavItem>
                <AddMovieModal/>
              </NavItem>
              
              {/* Пункт меню - модальное окно загрузки файла */}
              <NavItem>
                <FileUploadModal/>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNavBar;