import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import './index.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Homepage.jsx';
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<HomePage />} />
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route path="/events" element={<h1>Events</h1>} />
					<Route path="*" element={<h1>404</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
