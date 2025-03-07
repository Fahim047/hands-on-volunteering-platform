import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignIn = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Signing In...', formData);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-2xl shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email Address"
						className="w-full p-2 border rounded-lg"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full p-2 border rounded-lg"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
					>
						Sign In
					</button>
				</form>
				<p className="text-center mt-4">
					Don't have an account?
					<span
						className="text-indigo-600 cursor-pointer"
						onClick={() => navigate('/sign-up')}
					>
						Sign Up
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
