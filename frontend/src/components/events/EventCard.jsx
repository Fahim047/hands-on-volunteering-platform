import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const EventCard = ({
	event,
	onJoin = () => {},
	isJoining = false,
	alreadyJoined = false,
}) => {
	const categoryColor =
		event.category === 'Environment'
			? '#2E7D32'
			: event.category === 'Education'
			? '#1976D2'
			: event.category === 'Healthcare'
			? '#D32F2F'
			: '#6D6D6D';

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
			<div className="relative">
				<img
					src={
						event.thumbnail ||
						'https://placehold.co/400x300?text=No+Thumbnail+Available'
					}
					alt={event.title}
					className="w-full h-52 object-cover"
				/>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
				{/* Category Badge */}
				<div className="absolute top-2 right-2">
					<Badge style={{ backgroundColor: categoryColor }}>
						{event.category}
					</Badge>
				</div>
			</div>

			<div className="p-5 space-y-2">
				{/* Title */}
				<h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>

				{/* Organizer Info */}
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<User className="size-4" />
					<span className="font-medium">
						{event.author?.name || 'Unknown Organizer'}
					</span>
				</div>

				{/* Event Details */}
				<div className="flex flex-col gap-2 text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<CalendarIcon className="size-5 text-gray-600" />
						<span>{format(new Date(event.date), 'PPP')}</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="size-5 text-gray-600" />
						<span>{`${event.startTime} - ${event.endTime}`}</span>
					</div>
					<div className="flex items-center gap-1">
						<MapPin className="size-5 text-gray-600" />
						<span>{event.location}</span>
					</div>
					{/* Attendees Count (Moved here) */}
					<div className="flex items-center gap-1">
						<User className="size-5 text-gray-600" />
						<span>
							<strong>{event?.attendees?.length || 0}</strong> persons attending
						</span>
					</div>
				</div>

				{/* Description */}
				<p className="text-sm text-gray-600 line-clamp-2">
					{event.description}
				</p>

				{/* Action Buttons */}
				<div className="mt-4">
					{alreadyJoined ? (
						<Button variant="outline" className="w-full" disabled>
							✅ Already Joined
						</Button>
					) : (
						<Button
							className="w-full"
							onClick={() => onJoin(event.id)}
							disabled={isJoining}
						>
							{isJoining ? 'Joining...' : 'Join Event'}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
