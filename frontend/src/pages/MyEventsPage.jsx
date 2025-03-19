import EventDialog from '@/components/events/EventDialog';
import EventManageCard from '@/components/events/EventManageCard';
import { Button } from '@/components/ui/button';
import { deleteEvent, getMyEvents } from '@/lib/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

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
		},
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const handleDelete = (eventId) => {
		if (confirm('Are you sure you want to delete this event?')) {
			deleteMutation.mutate(eventId);
		}
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
			<div className="flex items-center justify-between">
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
