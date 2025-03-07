import { Link } from 'react-router';
import { Button } from '../ui/button';

const EventCard = ({ event }) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<div className="relative">
				<img
					src={event.imageUrl || '/api/placeholder/800/400'}
					alt={event.title}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-2 right-2">
					<span
						className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${
							event.category === 'Environment'
								? 'bg-green-100 text-green-800'
								: event.category === 'Education'
								? 'bg-blue-100 text-blue-800'
								: event.category === 'Healthcare'
								? 'bg-red-100 text-red-800'
								: 'bg-gray-100 text-gray-800'
						}`}
					>
						{event.category}
					</span>
				</div>
			</div>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-900 mb-1">
					{event.title}
				</h3>
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
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						{new Date(event.date).toLocaleDateString()}
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
						{event.location}
					</span>
				</p>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">
					{event.description}
				</p>
				<div className="flex justify-between items-center">
					<div className="text-sm text-gray-500">
						<span className="font-medium">{event.attendees.length}</span>{' '}
						volunteers
					</div>
					<Button asChild variant="outline">
						<Link to={`/events/${event.id}`}>Join Event</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
