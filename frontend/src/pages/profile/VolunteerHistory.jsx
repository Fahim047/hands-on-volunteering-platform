import VolunteerEventCard from '@/components/events/VounteerEventCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks';
import { getParticipationEvents } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';

const VolunteerHistory = () => {
	const { user } = useAuth();
	const {
		data: volunteerHistory,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['volunteerHistory'],
		queryFn: () => getParticipationEvents(user._id),
	});

	return (
		<Card className="shadow-lg">
			<CardContent className="p-6">
				<h2 className="text-2xl font-bold mb-12 text-center">
					Volunteer History
				</h2>
				{isPending && (
					<div className="space-y-4">
						<Skeleton className="h-40 w-full" />
						<Skeleton className="h-6 w-1/2" />
						<Skeleton className="h-6 w-1/3" />
					</div>
				)}

				{isError && (
					<p className="text-red-500 text-center">Failed to load events.</p>
				)}

				{!isPending && !isError && volunteerHistory?.length === 0 && (
					<p className="text-center text-gray-500">
						No past volunteer events found.
					</p>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{volunteerHistory?.map((event) => (
						<VolunteerEventCard key={event._id} event={event} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default VolunteerHistory;
