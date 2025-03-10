import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const SignIn = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onSubmit', // validate on submit
	});

	const onSubmit = async (data) => {
		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_BASE_URL}/auth/sign-in`,
				data
			);

			toast.success(response.data?.message || 'Sign in successful!');
			navigate('/');
		} catch (error) {
			console.error('Sign in error:', error.response?.data || error.message);
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
						Sign in
					</CardTitle>
					<CardDescription className="text-center">
						Please login to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
												placeholder="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-indigo-600 hover:bg-indigo-700"
								disabled={loading}
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<Separator />
				<CardFooter className="flex justify-center p-4">
					<div className="text-sm text-slate-600">
						Don&apos;t have an account?{' '}
						<Button
							variant="link"
							className="p-0 h-auto font-medium cursor-pointer"
							onClick={() => navigate('/sign-up')}
						>
							Create an account
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignIn;
