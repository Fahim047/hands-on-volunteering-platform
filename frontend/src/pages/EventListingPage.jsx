import EventCard from '@/components/events/EventCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, FilterX } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Sample events data
const events = [
	{
		id: 1,
		title: 'Beach Cleanup',
		description: 'Join us to help clean up the beach and protect marine life.',
		date: '2025-03-15',
		time: '9:00 AM - 12:00 PM',
		location: 'Santa Monica, CA',
		category: 'Environment',
		attendees: Array(25).fill({}),
		spotsAvailable: 15,
		image: 'https://placehold.co/400x300',
	},
	{
		id: 2,
		title: 'Food Drive',
		description:
			'Collect and distribute food to families in need in our community.',
		date: '2025-03-20',
		time: '1:00 PM - 4:00 PM',
		location: 'New York, NY',
		category: 'Community',
		attendees: Array(20).fill({}),
		spotsAvailable: 10,
		image: 'https://placehold.co/400x300',
	},
	{
		id: 3,
		title: 'Tutoring Program',
		description:
			'Help students improve their academic skills through one-on-one tutoring.',
		date: '2025-03-25',
		time: '3:30 PM - 5:30 PM',
		location: 'Chicago, IL',
		category: 'Education',
		attendees: Array(22).fill({}),
		spotsAvailable: 0,
		image: 'https://placehold.co/400x300',
	},
	{
		id: 4,
		title: 'Park Restoration',
		description:
			'Help restore our local park by planting trees and removing invasive species.',
		date: '2025-04-05',
		time: '8:00 AM - 12:00 PM',
		location: 'Austin, TX',
		category: 'Environment',
		attendees: Array(50).fill({}),
		spotsAvailable: 18,
		image: 'https://placehold.co/400x300',
	},
	{
		id: 5,
		title: 'Senior Center Assistance',
		description:
			'Spend time with seniors, helping with activities and providing companionship.',
		date: '2025-04-10',
		time: '1:00 PM - 4:00 PM',
		location: 'Seattle, WA',
		category: 'Community',
		attendees: Array(30).fill({}),
		spotsAvailable: 7,
		image: 'https://placehold.co/400x300',
	},
];

// Available categories for the select dropdown
const categories = [
	{ value: 'Environment', label: '🌱 Environment' },
	{ value: 'Community', label: '🏡 Community' },
	{ value: 'Education', label: '📚 Education' },
	{ value: 'Healthcare', label: '🏥 Healthcare' },
	{ value: 'Animal Welfare', label: '🐾 Animal Welfare' },
];

export default function EventListingPage() {
	const navigate = useNavigate();
	// State for filters
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState(undefined);
	const [showAvailableOnly, setShowAvailableOnly] = useState(false);

	// Reset all filters
	const resetFilters = () => {
		setSearch('');
		setCategory('');
		setLocation('');
		setDate(undefined);
		setShowAvailableOnly(false);
	};

	// Filter events based on selected criteria
	const filteredEvents = events.filter(
		(event) =>
			event.title.toLowerCase().includes(search.toLowerCase()) &&
			(category && category !== 'all' ? event.category === category : true) &&
			(location ? event.location.includes(location) : true) &&
			(date ? event.date === format(date, 'yyyy-MM-dd') : true) &&
			(showAvailableOnly ? event.spotsAvailable > 0 : true)
	);

	// Check if any filters are active
	const isFiltering =
		search !== '' ||
		category !== '' ||
		location !== '' ||
		date !== undefined ||
		showAvailableOnly;

	return (
		<div className="max-w-5xl mx-auto p-6">
			<div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
				<h1 className="text-3xl font-bold">Discover Volunteer Events</h1>
				<Button
					variant="outline"
					className="border-indigo-500 cursor-pointer"
					onClick={() => navigate('/events/create')}
				>
					Create an event
				</Button>
			</div>

			{/* Filters */}
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

						<div className="space-y-2">
							<Label className="text-sm font-medium">Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-start text-left font-normal"
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{date ? format(date, 'PPP') : 'Select a date'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="flex items-center space-x-2 pt-8">
							<input
								type="checkbox"
								id="availableOnly"
								checked={showAvailableOnly}
								onChange={(e) => setShowAvailableOnly(e.target.checked)}
								className="rounded border-gray-300"
							/>
							<Label htmlFor="availableOnly">Show available spots only</Label>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Active Filters Display */}
			{isFiltering && (
				<div className="flex flex-wrap gap-2 mb-6">
					{search && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Search: {search}
						</Badge>
					)}
					{category && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Category: {category}
						</Badge>
					)}
					{location && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Location: {location}
						</Badge>
					)}
					{date && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Date: {format(date, 'PPP')}
						</Badge>
					)}
					{showAvailableOnly && (
						<Badge variant="secondary" className="flex items-center gap-1">
							Available spots only
						</Badge>
					)}
				</div>
			)}

			{/* Results Count */}
			<div className="mb-6 bg-gray-100 w-fit p-2 rounded">
				<p className="text-sm text-slate-600">
					Found {filteredEvents.length}{' '}
					{filteredEvents.length === 1 ? 'event' : 'events'}
					{isFiltering ? ' matching your filters' : ''}
				</p>
			</div>

			{/* Event Grid */}
			{filteredEvents.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredEvents.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-xl text-slate-600 mb-4">No events found</p>
					<Button onClick={resetFilters} variant="outline">
						Clear Filters
					</Button>
				</div>
			)}
		</div>
	);
}
