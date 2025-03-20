import Sidebar from '@/components/profile/Sidebar';
import { Outlet } from 'react-router';

export default function ProfileDashboard() {
	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />
			<main className="flex-1 p-8">
				<Outlet />
			</main>
		</div>
	);
}
