import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks';
import { joinEvent } from '@/lib/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { FilterX, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const categories = [
	{ value: 'Environment', label: '🌱 Environment' },
	{ value: 'Community', label: '🏡 Community' },
	{ value: 'Education', label: '📚 Education' },
	{ value: 'Healthcare', label: '🏥 Healthcare' },
	{ value: 'Animal Welfare', label: '🐾 Animal Welfare' },
];

export default function EventListingPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const {
		data: events,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['events'],
		queryFn: async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL}/events`
			);
			return response.data.data;
		},
	});
	const { mutate: handleJoin, isPending: isJoining } = useMutation({
		mutationFn: joinEvent,
		onSuccess: (data, eventId) => {
			toast.success(data.message);
			queryClient.setQueryData(['events'], (oldData) =>
				oldData.map((event) =>
					event.id === eventId
						? { ...event, attendees: [...event.attendees, {}] }
						: event
				)
			);
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || 'Error while joining event');
		},
	});

	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState(undefined);

	const resetFilters = () => {
		setSearch('');
		setCategory('');
		setLocation('');
		setDate(undefined);
	};

	const filteredEvents =
		events?.filter(
			(event) =>
				event.title.toLowerCase().includes(search.toLowerCase()) &&
				(category && category !== 'all' ? event.category === category : true) &&
				(location ? event.location.includes(location) : true) &&
				(date ? event.date === format(date, 'yyyy-MM-dd') : true)
		) || [];

	const isFiltering =
		search !== '' || category !== '' || location !== '' || date !== undefined;

	if (isPending) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div className="max-w-5xl mx-auto p-6">
			<div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
				<h1 className="text-3xl font-bold">Discover Volunteer Events</h1>
				<Button
					variant="outline"
					className="border-indigo-500 cursor-pointer"
					onClick={() => navigate('/events/create')}
				>
					<Plus className="size-4" />
					Create an event
				</Button>
			</div>

			<Card className="mb-8 relative">
				<CardContent>
					{isFiltering && (
						<Button
							variant="outline"
							size="sm"
							onClick={resetFilters}
							className="flex items-center gap-2 mb-2 absolute bottom-0 right-2"
						>
							<FilterX size={16} />
							Reset Filters
						</Button>
					)}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label className="text-sm font-medium">Search</Label>
							<Input
								placeholder="Search events..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Category</Label>
							<Select value={category} onValueChange={setCategory}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="All Categories" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									{categories.map((cat) => (
										<SelectItem key={cat.value} value={cat.value}>
											{cat.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label className="text-sm font-medium">Location</Label>
							<Input
								placeholder="Filter by location..."
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredEvents.map((event) => (
					<EventCard
						key={event.id}
						event={event}
						isJoining={isJoining}
						onJoin={handleJoin}
						alreadyJoined={event?.attendees?.includes(user?._id)}
					/>
				))}
			</div>
		</div>
	);
}
