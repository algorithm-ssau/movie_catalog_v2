// Этот код представляет собой главный компонент (App.js) React-приложения, которое использует Redux для управления состоянием и Reactstrap (обёртка над Bootstrap) для стилизации.
import React, { Component } from 'react';
// Импортируем компоненты приложения
import AppNavBar from './components/AppNavBar'; // Навигационная панель
import MovieList from './components/MovieList';  // Список фильмов

// Импортируем необходимые компоненты из reactstrap
import { Container } from 'reactstrap';

// Импортируем Provider из react-redux для работы с Redux
import { Provider } from 'react-redux';
import store from './store'; // Импортируем Redux store

// Импортируем стили Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Импортируем кастомные стили приложения
import './App.css';

// Главный компонент приложения
class App extends Component {
  render() {
    return (
      // Provider делает Redux store доступным для всех компонентов внутри него
      <Provider store={store}>
        <div className="App">
          {/* Навигационная панель */}
          <AppNavBar />
          
          {/* Основной контейнер для содержимого */}
          <Container>
            {/* Компонент со списком фильмов */}
            <MovieList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;