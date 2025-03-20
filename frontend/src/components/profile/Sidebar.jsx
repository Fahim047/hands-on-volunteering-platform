import { Award, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export default function Sidebar() {
	const location = useLocation();

	return (
		<aside className="w-64 bg-white shadow-md p-6 space-y-6">
			<h2 className="text-2xl font-bold">Dashboard</h2>
			<nav className="space-y-4">
				{/* Profile Link */}
				<Link
					to="/profile"
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
						location.pathname === '/profile'
							? 'bg-indigo-100 text-indigo-600'
							: 'hover:bg-gray-200'
					}`}
				>
					<User className="w-5 h-5" /> Profile
				</Link>
				<Link
					to="/profile/edit"
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
						location.pathname === '/profile/edit'
							? 'bg-indigo-100 text-indigo-600'
							: 'hover:bg-gray-200'
					}`}
				>
					<User className="w-5 h-5" /> Edit Profile
				</Link>

				{/* Volunteer History Link */}
				<Link
					to="/profile/history"
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
						location.pathname === '/history'
							? 'bg-indigo-100 text-indigo-600'
							: 'hover:bg-gray-200'
					}`}
				>
					<History className="w-5 h-5" /> Volunteer History
				</Link>

				{/* Impact & Contributions Link */}
				<Link
					to="/profile/impact"
					className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
						location.pathname === '/impact'
							? 'bg-indigo-100 text-indigo-600'
							: 'hover:bg-gray-200'
					}`}
				>
					<Award className="w-5 h-5" /> Impact & Contributions
				</Link>
			</nav>
		</aside>
	);
}
