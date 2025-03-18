import EventCreationPage from '@/pages/EventCreationPage';
import EventListingPage from '@/pages/EventListingPage';
import HelpRequestPage from '@/pages/HelpRequestPage';
import HomePage from '@/pages/HomePage.jsx';
import ProfileManagement from '@/pages/ProfileManagementPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import './index.css';
import MainLayout from './layouts/MainLayout';
import HelpRequestDetailsPage from './pages/HelpRequestDetailsPage';
import AuthProvider from './providers/AuthProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<HomePage />} />
							<Route path="sign-in" element={<SignIn />} />
							<Route path="sign-up" element={<SignUp />} />
							<Route path="profile" element={<ProfileManagement />} />
							<Route path="/events" element={<EventListingPage />} />
							<Route path="/events/create" element={<EventCreationPage />} />
							<Route path="/help-requests" element={<HelpRequestPage />} />
							<Route
								path="/help-requests/:id"
								element={<HelpRequestDetailsPage />}
							/>
							<Route path="*" element={<h1>404</h1>} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
