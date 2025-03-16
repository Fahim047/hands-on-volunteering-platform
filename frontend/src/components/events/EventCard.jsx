import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

const EventCard = ({
	event,
	onJoin = () => {},
	isJoining = false,
	alreadyJoined = false,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<div className="relative">
				<img
					src={event.image || 'https://placehold.co/400x300'}
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
						<CalendarIcon className="size-5 mr-1" />
						<span>{format(new Date(event.date), 'PPP')}</span>
					</span>
				</p>
				<p className="text-sm text-gray-500 mb-3">
					<span className="flex items-center">
						<Clock className="size-5 mr-1" />
						<span>{`${event.startTime} - ${event.endTime}`}</span>
					</span>
				</p>
				<p className="text-sm text-gray-500 mb-3">
					<span className="flex items-center">
						<MapPin className="size-5 mr-1" />
						{event.location}
					</span>
				</p>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">
					{event.description}
				</p>
				<div className="flex flex-col gap-2">
					<div className="text-sm text-gray-500">
						<span className="font-medium">{event?.attendees?.length || 0}</span>{' '}
						volunteers
					</div>
					{alreadyJoined ? (
						<Button variant="outline" disabled>
							✅ Already Joined
						</Button>
					) : (
						<Button onClick={() => onJoin(event.id)} disabled={isJoining}>
							{isJoining ? 'Joining...' : 'Join Event'}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
