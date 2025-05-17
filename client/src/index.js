// Этот код представляет собой основной входной файл (обычно index.js) для React-приложения, созданного с помощью Create React App (CRA)
// Импортируем необходимые библиотеки
import React from 'react'; // Основная библиотека React
import ReactDOM from 'react-dom'; // Для работы с DOM
import App from './App'; // Главный компонент приложения
import * as serviceWorker from './serviceWorker'; // Сервис-воркер для PWA

// Рендерим главный компонент App в DOM-элемент с id="root"
ReactDOM.render(
  <App />, // Корневой компонент приложения
  document.getElementById('root') // DOM-контейнер, куда монтируется приложение
);

// Настройка сервис-воркера (для PWA-функциональности)
// По умолчанию сервис-воркер отключен (unregister())
// Чтобы включить PWA-функции (оффлайн-режим и кэширование), замените unregister() на register()
// Важно: это имеет некоторые особенности - подробнее: http://bit.ly/CRA-PWA
serviceWorker.unregister();