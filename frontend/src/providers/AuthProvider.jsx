import LoadingComponent from '@/components/shared/LoadingComponent';
import { AuthContext } from '@/contexts';
import { useStorage } from '@/hooks';
import { useEffect, useMemo, useState } from 'react';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useStorage('user', null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const authInfo = useMemo(() => ({ user, setUser }), [user, setUser]);

	useEffect(() => {
		const initializeUser = async () => {
			try {
				if (user === null) {
					const storedUser = JSON.parse(localStorage.getItem('user'));
					if (storedUser) {
						setUser(storedUser);
					}
				}
			} catch (err) {
				console.error('Error loading user data:', err);
				setError('Error loading user data');
			} finally {
				setLoading(false);
			}
		};

		initializeUser();
	}, [user, setUser]);

	if (loading) {
		return <LoadingComponent />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
