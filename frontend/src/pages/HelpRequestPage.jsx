import HelpRequestCard from '@/components/help/HelpRequestCard';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks';
import { getHelpRequests, postHelpRequest } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const urgencyLevels = [
	{ value: 'low', label: '🟢 Low' },
	{ value: 'medium', label: '🟡 Medium' },
	{ value: 'urgent', label: '🔴 Urgent' },
];

export default function HelpRequestPage() {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// React Hook Form setup
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			urgency: '',
		},
	});

	const {
		data: requests,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['help-requests'],
		queryFn: getHelpRequests,
	});

	// Simulate posting a new help request
	const postRequest = async (data) => {
		setIsLoading(true);
		try {
			const newRequest = {
				...data,
				author: user._id,
			};
			const response = await postHelpRequest(newRequest);
			if (response.status) {
				toast.success(response.message || 'Request posted successfully!');
				reset();
				setIsModalOpen(false);
			}
		} catch (error) {
			console.error('Error posting request:', error);
			toast.error('Something went wrong!');
		} finally {
			setIsLoading(false);
		}
	};

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Community Help Requests</h1>

			<div className="flex items-center justify-between mb-6">
				{/* Filter Dropdown (No Functionality) */}
				<Select>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Urgency" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{urgencyLevels.map((level) => (
							<SelectItem key={level.value} value={level.value}>
								{level.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Post Request Button */}
				<Button onClick={() => setIsModalOpen(true)}>Post a New Request</Button>
			</div>

			{/* Help Requests List */}
			{isLoading ? (
				<p>Loading requests...</p>
			) : (
				<div className="space-y-4">
					{requests.map((req) => (
						<HelpRequestCard request={req} key={req.id} />
					))}
				</div>
			)}

			{/* Modal for Posting Requests */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-h-screen overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Post a New Help Request</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(postRequest)} className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="title" className="text-sm font-medium">
								Title
							</label>
							<Input
								id="title"
								placeholder="Title of your request"
								{...register('title', { required: 'Title is required' })}
							/>
							{errors.title && (
								<p className="text-red-500 text-sm">{errors.title.message}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="description" className="text-sm font-medium">
								Description
							</label>
							<Textarea
								id="description"
								placeholder="Describe your request..."
								{...register('description', {
									required: 'Description is required',
								})}
								className="resize-none h-24"
							/>
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor="urgency" className="text-sm font-medium">
								Urgency Level
							</label>
							{/* Use Controller for Select */}
							<Controller
								name="urgency"
								control={control}
								rules={{ required: 'Urgency level is required' }}
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger id="urgency" className="w-full">
											<SelectValue placeholder="Select Urgency" />
										</SelectTrigger>
										<SelectContent>
											{urgencyLevels.map((level) => (
												<SelectItem key={level.value} value={level.value}>
													{level.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
							{errors.urgency && (
								<p className="text-red-500 text-sm">{errors.urgency.message}</p>
							)}
						</div>

						<Button type="submit" disabled={isLoading} className="w-full">
							{isLoading ? 'Posting...' : 'Submit Request'}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
