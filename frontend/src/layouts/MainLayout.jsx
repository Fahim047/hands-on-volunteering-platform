import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default MainLayout;
