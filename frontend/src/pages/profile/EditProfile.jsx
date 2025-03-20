import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const interestsOptions = [
	'Environment',
	'Education',
	'Healthcare',
	'Animal Welfare',
	'Community Development',
];

const EditProfile = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	// Set initial values for form
	const form = useForm({
		defaultValues: {
			name: '',
			skills: '',
			interests: [],
			avatar: '', // New field for Avatar URL
		},
		mode: 'onSubmit', // validate on submit
	});

	const watchedInterests = form.watch('interests') || [];

	// TanStack Query mutation
	const { mutate, isPending } = useMutation({
		mutationFn: () => toast.info('Not implemented yet!'),
	});

	const onSubmit = (data) => {
		mutate(data);
	};
	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name || '',
				skills: user.skills || '',
				interests: user.interests || [],
				avatar: user.avatar || 'https://placehold.co/400x400?text=No+Avatar',
			});
		}
	}, [user, form]);

	return (
		<Card className="w-full shadow-lg">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">
					Edit Profile
				</CardTitle>
				<CardDescription className="text-center">
					Update your profile information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							rules={{ required: 'Full name is required' }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="skills"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Skills</FormLabel>
									<FormControl>
										<Input
											placeholder="JavaScript, React, UI Design"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Avatar URL Input */}
						<FormField
							control={form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Avatar URL</FormLabel>
									<FormControl>
										<Input
											placeholder="https://example.com/avatar.jpg"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Interests - Multi-Select Checkboxes */}
						<FormField
							control={form.control}
							name="interests"
							rules={{
								validate: (value) =>
									value.length > 0 || 'Select at least one interest',
							}}
							render={() => (
								<FormItem className="space-y-3">
									<FormLabel className="text-base">Select Interests</FormLabel>
									<FormMessage />
									<div className="grid grid-cols-2 gap-2">
										{interestsOptions.map((interest) => (
											<div
												key={interest}
												className="flex items-center space-x-2"
											>
												<Checkbox
													className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
													id={`interest-${interest}`}
													checked={watchedInterests.includes(interest)}
													onCheckedChange={(checked) => {
														const currentInterests = [...watchedInterests];
														if (checked) {
															form.setValue('interests', [
																...currentInterests,
																interest,
															]);
														} else {
															form.setValue(
																'interests',
																currentInterests.filter((i) => i !== interest)
															);
														}
													}}
												/>
												<Label
													htmlFor={`interest-${interest}`}
													className="text-sm font-medium"
												>
													{interest}
												</Label>
											</div>
										))}
									</div>
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-indigo-600 hover:bg-indigo-700"
							disabled={isPending}
						>
							{isPending ? 'Updating Profile...' : 'Save Changes'}
						</Button>
					</form>
				</Form>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-center p-4">
				<div className="text-sm text-slate-600">
					<Button
						variant="link"
						className="p-0 h-auto font-medium cursor-pointer"
						onClick={() => navigate('/profile')}
					>
						Go to Profile
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default EditProfile;
