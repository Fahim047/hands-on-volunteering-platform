import { Link } from 'react-router';
import EventCard from '../events/EventCard';
import { Button } from '../ui/button';

const sampleEvents = [
	{
		author: '67ce575796c04c2699cd8227',
		category: 'Healthcare',
		createdAt: '2025-03-14T02:54:16.952Z',
		date: '2025-03-24T18:00:00.000Z',
		description: 'We are arranging a free blood donation camp.',
		endTime: '16:00',
		id: '67d39a588939cbc989e24938',
		location: 'GSTU, Gopalganj',
		startTime: '08:00',
		title: 'Blood Donation',
		updatedAt: '2025-03-14T02:54:16.952Z',
	},
];
const UpComingEventSection = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
				<p className="mt-1 text-lg text-gray-500">
					Discover volunteer opportunities in your area
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sampleEvents.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
			<div className="mt-8 text-center">
				<Button asChild variant="outline">
					<Link to="/events">View All Events</Link>
				</Button>
			</div>
		</div>
	);
};

export default UpComingEventSection;
