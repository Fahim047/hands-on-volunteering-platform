import EventCard from '@/components/events/EventCard';
import { useAuth } from '@/hooks';
import { getParticipationEvents } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';

const MyParticipationEvents = () => {
	const { user } = useAuth();

	const {
		data: participationEvents,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['participation-events', user._id],
		queryFn: () => getParticipationEvents(user._id),
		enabled: !!user, // Only fetch when user is available
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Something went wrong!</p>;

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{participationEvents.length > 0 ? (
					participationEvents.map((event) => (
						<EventCard key={event.id} event={event} alreadyJoined />
					))
				) : (
					<p className="text-gray-500">You haven't joined any events yet.</p>
				)}
			</div>
		</div>
	);
};

export default MyParticipationEvents;
