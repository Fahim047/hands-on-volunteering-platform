import { useAuth } from '@/hooks';
import { getUpcomingEvents, joinEvent } from '@/lib/queries'; // Import joinEvent
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'sonner';
import EventCard from '../events/EventCard';
import { Button } from '../ui/button';

const UpComingEventSection = () => {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	// Fetch upcoming events
	const {
		data: upcomingEvents,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['upcoming-events'],
		queryFn: getUpcomingEvents,
	});

	// Handle joining event
	const { mutate: handleJoin, isPending: isJoining } = useMutation({
		mutationFn: joinEvent,
		onSuccess: (data, eventId) => {
			toast.success(data.message);

			// Update the cache to reflect the new attendee
			queryClient.setQueryData(['upcoming-events'], (oldData) =>
				oldData?.map((event) =>
					event.id === eventId
						? { ...event, attendees: [...event.attendees, user?._id] }
						: event
				)
			);
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || 'Error while joining event');
		},
	});

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Error loading events</div>;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
				<p className="mt-1 text-lg text-gray-500">
					Discover volunteer opportunities in your area
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{upcomingEvents.length > 0 ? (
					upcomingEvents.map((event) => (
						<EventCard
							key={event.id}
							event={event}
							isJoining={isJoining}
							onJoin={() => handleJoin(event.id)}
							alreadyJoined={event?.attendees?.includes(user?._id)}
						/>
					))
				) : (
					<div className="col-span-full text-center text-gray-500 p-6">
						<p className="text-lg">😞 No upcoming events found.</p>
					</div>
				)}
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
