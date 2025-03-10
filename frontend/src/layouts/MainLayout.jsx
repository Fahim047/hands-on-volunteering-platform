import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster richColors position="top-right" />
		</>
	);
};

export default MainLayout;
