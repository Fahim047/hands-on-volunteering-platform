import EventDialog from '@/components/events/EventDialog';
import EventManageCard from '@/components/events/EventManageCard';
import { Button } from '@/components/ui/button';
import { deleteEvent, getMyEvents } from '@/lib/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const MyEventsPage = () => {
	const queryClient = useQueryClient();

	const {
		data: myEvents,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['my-events'],
		queryFn: getMyEvents,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries(['my-events']);
			toast.success('Event deleted successfully!');
		},
		onError: () => {
			toast.error('Could not delete event!');
		},
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const handleDelete = (eventId) => {
		toast.custom(
			(t) => (
				<div className="w-96 p-4 bg-gray-100 rounded-lg">
					<h4 className="text-xl font-bold mb-4">Are you sure?</h4>
					<div className="flex items-center gap-2 justify-center">
						<Button
							variant="outline"
							size="lg"
							onClick={() => toast.dismiss(t)}
						>
							No
						</Button>
						<Button
							variant="destructive"
							className="hover:bg-red-500"
							size="lg"
							onClick={() => {
								deleteMutation.mutate(eventId);
								toast.dismiss(t);
							}}
						>
							Yes
						</Button>
					</div>
				</div>
			),
			{ position: 'top-center', duration: Infinity }
		);
	};

	const handleEdit = (event) => {
		setSelectedEvent(event);
		setDialogOpen(true);
	};

	const handleCreate = () => {
		setSelectedEvent(null);
		setDialogOpen(true);
	};

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Error fetching events</div>;
	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold mb-4">My Events</h1>
				{/* Create Event Button */}
				<Button onClick={handleCreate}>Create Event</Button>
			</div>
			{myEvents.length === 0 ? (
				<p className="text-gray-500">No events created yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{myEvents.map((event) => (
						<EventManageCard
							key={event.id}
							event={event}
							onDelete={handleDelete}
							onEdit={handleEdit} // Pass the edit handler here
						/>
					))}
				</div>
			)}

			{/* Event Dialog for Create or Edit */}
			<EventDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)} // Close dialog
				eventData={selectedEvent} // Pass selected event to prepopulate data
			/>
		</div>
	);
};

export default MyEventsPage;
