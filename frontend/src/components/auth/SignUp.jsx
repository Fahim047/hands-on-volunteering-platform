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
import axios from 'axios';
import { useState } from 'react';
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

const SignUp = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			skills: '',
			interests: [],
		},
		mode: 'onSubmit', // validate on submit
	});

	const watchedInterests = form.watch('interests') || [];

	const onSubmit = async (data) => {
		setLoading(true);

		try {
			const response = await axios.post(
				'http://localhost:8000/api/v1/auth/sign-up',
				data
			);

			toast.success(response.data?.message || 'Signup successful!');
			navigate('/sign-in');
		} catch (error) {
			console.error('Signup error:', error.response?.data || error.message);
			toast.error(error.response?.data?.message || 'Something went wrong!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-12 flex items-center justify-center min-h-screen bg-slate-50">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Create an Account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details to sign up
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
								name="email"
								rules={{
									required: 'Email is required',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Enter a valid email',
									},
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="john@email.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								rules={{
									required: 'Password is required',
									minLength: { value: 8, message: 'Minimum 8 characters' },
								}}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="••••••••"
												{...field}
											/>
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
										<FormLabel className="text-base">
											Select Interests
										</FormLabel>
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
								disabled={loading}
							>
								{loading ? 'Signing Up...' : 'Create Account'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<Separator />
				<CardFooter className="flex justify-center p-4">
					<div className="text-sm text-slate-600">
						Already have an account?{' '}
						<Button
							variant="link"
							className="p-0 h-auto font-medium cursor-pointer"
							onClick={() => navigate('/sign-in')}
						>
							Sign In
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignUp;
