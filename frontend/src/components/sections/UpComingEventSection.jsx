import { Link } from 'react-router';
import EventCard from '../events/EventCard';
import { Button } from '../ui/button';
const sampleEvents = [
	{
		id: 1,
		title: 'Beach Cleanup Drive',
		category: 'Environment',
		date: '2025-03-15',
		location: 'Sunset Beach',
		description:
			'Join us for a community beach cleanup to protect our oceans and marine life. Bring gloves and sun protection!',
		attendees: Array(18).fill({}),
		imageUrl: 'https://placehold.co/800x400',
	},
	{
		id: 2,
		title: 'After-School Tutoring',
		category: 'Education',
		date: '2025-03-10',
		location: 'Central Library',
		description:
			'Help elementary school students with homework and reading. No experience necessary, just patience and enthusiasm!',
		attendees: Array(12).fill({}),
		imageUrl: 'https://placehold.co/800x400',
	},
	{
		id: 3,
		title: 'Food Bank Distribution',
		category: 'Food Security',
		date: '2025-03-20',
		location: 'Community Center',
		description:
			'Help pack and distribute food boxes to families in need. Morning and afternoon shifts available.',
		attendees: Array(25).fill({}),
		imageUrl: 'https://placehold.co/800x400',
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
