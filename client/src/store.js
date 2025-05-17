// Этот код создает Redux-хранилище (store) — централизованное место для хранения состояния приложения.
// Импортируем необходимые функции из Redux
import { createStore, applyMiddleware, compose } from 'redux';
// Импортируем middleware thunk для асинхронных действий
import thunk from 'redux-thunk';
// Импортируем корневой редьюсер, объединяющий все редьюсеры приложения
import rootReducer from './reducers';

// Начальное состояние хранилища (пустой объект)
const initialState = {};

// Массив middleware (промежуточного ПО) для Redux
// Пока только thunk для обработки асинхронных действий
const middleware = [thunk];

// Создаем Redux хранилище (store)
const store = createStore(
  rootReducer,       // Корневой редьюсер, управляющий состоянием
  initialState,     // Начальное состояние приложения
  compose(          // Функция композиции для расширения функционала
    applyMiddleware(...middleware) // Применяем все middleware
    // Для разработки можно добавить Redux DevTools:
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Экспортируем созданное хранилище для использования в приложении
export default store;