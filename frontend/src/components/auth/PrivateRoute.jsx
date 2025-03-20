import { useAuth } from '@/hooks';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
	const { user } = useAuth();
	const location = useLocation();

	if (user && user?.token) return children;

	return <Navigate state={location.pathname} to="/sign-in" />;
};

export default PrivateRoute;
