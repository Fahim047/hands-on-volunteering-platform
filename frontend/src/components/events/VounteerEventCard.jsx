import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

const VolunteerEventCard = ({ event }) => {
	return (
		<Card className="w-full pt-0 shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden relative">
			<img
				src={
					event.thumbnail || `https://placehold.co/400x300?text='No+Thumbnail'`
				}
				alt={event.title}
				className="w-full h-40 object-cover"
			/>
			<div className="absolute top-2 right-2">
				<Badge className="bg-indigo-500 text-white">{event.category}</Badge>
			</div>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex items-center text-gray-600 text-sm">
					<Calendar className="w-4 h-4 mr-2 text-indigo-500" />
					{new Date(event.date).toLocaleDateString()}
				</div>
				<div className="flex items-center text-gray-600 text-sm">
					<MapPin className="w-4 h-4 mr-2 text-green-500" />
					{event.location}
				</div>
			</CardContent>
		</Card>
	);
};

export default VolunteerEventCard;
