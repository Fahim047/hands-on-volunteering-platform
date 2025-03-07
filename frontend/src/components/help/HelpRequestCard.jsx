import { Link } from 'react-router';
import { Button } from '../ui/button';

const HelpRequestCard = ({ request }) => {
	const urgencyColors = {
		low: 'bg-blue-100 text-blue-800',
		medium: 'bg-yellow-100 text-yellow-800',
		urgent: 'bg-red-100 text-red-800',
	};

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-lg font-semibold text-gray-900">
						{request.title}
					</h3>
					<span
						className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
							urgencyColors[request.urgency]
						}`}
					>
						{request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
					</span>
				</div>
				<p className="text-sm text-gray-500 mb-3">
					<span className="flex items-center">
						<svg
							className="h-4 w-4 text-gray-400 mr-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						Posted by {request.author.name}
					</span>
				</p>
				<p className="text-sm text-gray-500 mb-3">
					<span className="flex items-center">
						<svg
							className="h-4 w-4 text-gray-400 mr-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{request.location}
					</span>
				</p>
				<p className="text-sm text-gray-600 mb-4 line-clamp-3">
					{request.description}
				</p>
				<div className="flex justify-between items-center">
					<div className="text-sm text-gray-500">
						<span className="font-medium">{request.responses}</span> responses
					</div>
					<Link to={`/help-requests/${request.id}`}>
						<Button variant="outline" size="sm">
							Offer Help
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HelpRequestCard;
