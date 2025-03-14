import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

const EventCard = ({ event }) => {
	return (
		<Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-indigo-200">
			{/* Event Header with Image */}
			<CardHeader className="relative bg-indigo-500 text-white py-5 px-6">
				{/* Add the image here */}
				<img
					src={event.image || 'https://placehold.co/400x300'} // Assuming 'event.image' is the URL of the event image
					alt="Event"
					className="w-full h-40 object-cover rounded-lg mb-4"
				/>
				<Badge variant="secondary" className="absolute top-3 right-3">
					{event.category}
				</Badge>
				<CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
				<p className="text-sm opacity-90">{event.description}</p>
			</CardHeader>

			{/* Event Details */}
			<CardContent className="p-6 space-y-3 text-gray-700">
				<div className="flex items-center gap-2 text-sm">
					<CalendarIcon className="w-5 h-5 text-indigo-500" />
					<span>{format(new Date(event.date), 'PPP')}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Clock className="w-5 h-5 text-indigo-500" />
					<span>
						{event.startTime} - {event.endTime}
					</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<MapPin className="w-5 h-5 text-indigo-500" />
					<span>{event.location}</span>
				</div>
			</CardContent>

			{/* Event Actions */}
			<CardFooter className="p-6 border-t bg-gray-50 flex justify-between">
				<Button className="bg-indigo-500 hover:bg-indigo-600 w-full">
					Join Event
				</Button>
			</CardFooter>
		</Card>
	);
};

export default EventCard;
