import { format } from 'date-fns';
import { CalendarIcon, Clock, Edit, MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const EventManageCard = ({ event, onEdit, onDelete }) => {
	return (
		<Card className="p-0 gap-3 bg-white shadow-md rounded-lg overflow-hidden">
			{/* Event Image */}
			<div className="relative">
				<img
					src={event.thumbnail || 'https://placehold.co/400x300?text=No+Image'}
					alt={event.title}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-2 right-2">
					<Badge>{event.category}</Badge>
				</div>
			</div>
			<CardContent className="px-3">
				<Link
					to={`/events/${event.id}`}
					className="text-lg font-semibold text-gray-900 hover:text-primary inline-block mb-2"
				>
					{event.title}
				</Link>
				<p className="text-sm text-gray-500 mb-2 flex items-center">
					<CalendarIcon className="size-5 mr-1" />
					<span>{format(new Date(event.date), 'PPP')}</span>
				</p>
				<p className="text-sm text-gray-500 mb-2 flex items-center">
					<Clock className="size-5 mr-1" />
					<span>{`${event.startTime} - ${event.endTime}`}</span>
				</p>
				<p className="text-sm text-gray-500 mb-3 flex items-center">
					<MapPin className="size-5 mr-1" />
					{event.location}
				</p>
				<p className="text-sm text-gray-600 mb-4 line-clamp-2">
					{event.description}
				</p>

				{/* Action Buttons */}
				<div className="flex justify-between mb-4">
					<Button
						variant="outline"
						className="flex items-center"
						onClick={() => onEdit(event)}
					>
						<Edit className="size-5 mr-2" /> Edit
					</Button>
					<Button
						variant="destructive"
						className="flex items-center"
						onClick={() => onDelete(event.id)}
					>
						<Trash2 className="size-5 mr-2" /> Delete
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default EventManageCard;
