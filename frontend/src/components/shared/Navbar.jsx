import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

const Navbar = ({ user }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/" className="text-2xl font-bold text-indigo-600">
								HandsOn
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link
								to="/events"
								className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Events
							</Link>
							<Link
								to="/help-requests"
								className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Help Requests
							</Link>
							<Link
								to="/teams"
								className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Teams
							</Link>
							<Link
								to="/impact"
								className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
							>
								Impact
							</Link>
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						{user ? (
							<div className="flex items-center space-x-4">
								<Link to="/profile" className="flex items-center">
									<img
										className="h-8 w-8 rounded-full"
										src={user.avatar || 'https://via.placeholder.com/40'}
										alt="User avatar"
									/>
									<span className="ml-2 text-sm font-medium text-gray-700">
										{user.name}
									</span>
								</Link>
							</div>
						) : (
							<div className="flex items-center space-x-4">
								<Button asChild variant="outline">
									<Link to="/login">Log in</Link>
								</Button>
								<Button asChild className="bg-indigo-600 hover:bg-indigo-700">
									<Link to="/register">Sign up</Link>
								</Button>
							</div>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex items-center sm:hidden">
						<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="sm:hidden">
					<div className="pt-2 pb-3 space-y-1">
						<Link
							to="/events"
							className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-indigo-500"
						>
							Events
						</Link>
						<Link
							to="/help-requests"
							className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-indigo-500"
						>
							Help Requests
						</Link>
						<Link
							to="/teams"
							className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-indigo-500"
						>
							Teams
						</Link>
						<Link
							to="/impact"
							className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-indigo-500"
						>
							Impact
						</Link>
					</div>
					{user ? (
						<div className="pt-4 pb-3 border-t border-gray-200">
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									<img
										className="h-10 w-10 rounded-full"
										src={user.avatar || 'https://via.placeholder.com/40'}
										alt="User avatar"
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">
										{user.name}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{user.email}
									</div>
								</div>
							</div>
							<div className="mt-3 space-y-1">
								<Button asChild>
									<Link to="/profile">Your Profile</Link>
								</Button>
								<Button>Sign out</Button>
							</div>
						</div>
					) : (
						<div className="px-4 pt-4 pb-3 border-t border-gray-200">
							<div className="space-x-2">
								<Button asChild variant="outline">
									<Link to="/login">Log in</Link>
								</Button>
								<Button asChild className="bg-indigo-600 hover:bg-indigo-700">
									<Link to="/register">Sign up</Link>
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
