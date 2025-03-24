import EventCreationPage from '@/pages/EventCreationPage';
import EventListingPage from '@/pages/EventListingPage';
import HelpRequestPage from '@/pages/HelpRequestPage';
import HomePage from '@/pages/HomePage.jsx';
import ProfileDashboard from '@/pages/ProfileDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import PrivateRoute from './components/auth/PrivateRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NotFoundPage from './components/shared/NotFoundPage';
import './index.css';
import MainLayout from './layouts/MainLayout';
import HelpRequestDetailsPage from './pages/HelpRequestDetailsPage';
import MyEventsPage from './pages/MyEventsPage';
import MyParticipationEvents from './pages/MyParticipationEvents';
import EditProfile from './pages/profile/EditProfile';
import Profile from './pages/profile/Profile';
import VolunteerHistory from './pages/profile/VolunteerHistory';
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
							<Route
								path="profile"
								element={
									<PrivateRoute>
										<ProfileDashboard />
									</PrivateRoute>
								}
							>
								<Route index element={<Profile />} />
								<Route path="edit" element={<EditProfile />} />
								<Route path="history" element={<VolunteerHistory />} />
								<Route path="impact" element={<h1>impact</h1>} />
								<Route path="*" element={<NotFoundPage />} />
							</Route>
							<Route
								path="my-events"
								element={
									<PrivateRoute>
										<MyEventsPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="my-participation-events"
								element={
									<PrivateRoute>
										<MyParticipationEvents />
									</PrivateRoute>
								}
							/>
							<Route path="/events" element={<EventListingPage />} />
							<Route
								path="/events/create"
								element={
									<PrivateRoute>
										<EventCreationPage />
									</PrivateRoute>
								}
							/>
							<Route path="/help-requests" element={<HelpRequestPage />} />
							<Route
								path="/help-requests/:id"
								element={<HelpRequestDetailsPage />}
							/>
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
