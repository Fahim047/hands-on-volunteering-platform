import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/events" element={<h1>Events</h1>} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
