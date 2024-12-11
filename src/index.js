import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Для маршрутизации
import App from './App'; // Основной компонент приложения
import './index.css'; // Глобальные стили

// Создаем корневой элемент для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);