import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Categories for selection
const categories = [
	{ value: 'Environment', label: '🌱 Environment' },
	{ value: 'Community', label: '🏡 Community' },
	{ value: 'Education', label: '📚 Education' },
	{ value: 'Healthcare', label: '🏥 Healthcare' },
	{ value: 'Animal Welfare', label: '🐾 Animal Welfare' },
	{ value: 'Other', label: '❕Other' },
];

export default function EventCreationPage() {
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();

	const form = useForm({
		defaultValues: {
			title: '',
			description: '',
			date: undefined,
			startTime: '',
			endTime: '',
			location: '',
			category: '',
		},
		mode: 'onSubmit', // validate on submit
	});

	// Handle Form Submission
	const onSubmit = async (data) => {
		setLoading(true);

		const newEvent = {
			...data,
			author: user._id,
		};

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/events`,
				newEvent
			);

			toast.success(response.data?.message || 'Event Created Successfully!');

			// Reset form
			form.reset();
		} catch (error) {
			toast.error('Something went wrong!');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-12">
			<div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl text-center font-bold mb-6">
					Create a Volunteer Event
				</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Title */}
						<FormField
							control={form.control}
							name="title"
							rules={{ required: 'Title is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter event title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							rules={{
								required: 'Description is required',
								minLength: {
									value: 10,
									message: 'Description must be at least 10 characters',
								},
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe the event..."
											{...field}
											className="resize-none"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex gap-4">
							{/* Category */}
							<div className="w-1/2">
								<FormField
									control={form.control}
									name="category"
									rules={{ required: 'Please select a category' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														{' '}
														{/* Ensure full width */}
														<SelectValue placeholder="Select Category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="w-full">
													{' '}
													{/* Ensure dropdown expands */}
													{categories.map((cat) => (
														<SelectItem key={cat.value} value={cat.value}>
															{cat.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* Location */}
							<div className="w-1/2">
								<FormField
									control={form.control}
									name="location"
									rules={{ required: 'Location is required' }}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<div className="relative">
													<MapPin className="absolute size-5 right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
													<Input
														className="pr-10 w-full"
														placeholder="Enter location"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						{/* Date Picker */}
						<FormField
							control={form.control}
							name="date"
							rules={{ required: 'Date is required' }}
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className="w-full flex items-center justify-start"
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Select a date</span>
													)}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Time Section with Start and End Time */}
						<div className="grid grid-cols-2 gap-4">
							{/* Start Time */}
							<FormField
								control={form.control}
								name="startTime"
								rules={{ required: 'Start time is required' }}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Time</FormLabel>
										<FormControl>
											<div className="relative">
												<Clock className="absolute left-3 top-2 size-5 text-gray-400" />
												<Input type="time" className="pl-10" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* End Time */}
							<FormField
								control={form.control}
								name="endTime"
								rules={{
									required: 'End time is required',
									validate: (value, formValues) => {
										if (!formValues.startTime || !value) return true;
										return (
											value > formValues.startTime ||
											'End time must be after start time'
										);
									},
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Time</FormLabel>
										<FormControl>
											<div className="relative w-full">
												<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
												<Input
													type="time"
													className="pl-10 inline-block w-full text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
													{...field}
													onFocus={(e) => e.target.showPicker()} // Click opens time picker
													onKeyDown={(e) => e.preventDefault()} // Prevent manual input
													style={{
														appearance: 'none',
														WebkitAppearance: 'none',
														MozAppearance: 'none',
														cursor: 'pointer',
													}}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* Buttons */}
						<div className="flex flex-col gap-3 mt-4">
							<Button
								type="submit"
								className="w-full bg-indigo-600 hover:bg-indigo-700"
								disabled={loading}
							>
								{loading ? 'Creating...' : 'Create Event'}
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => form.reset()}
							>
								Reset
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
