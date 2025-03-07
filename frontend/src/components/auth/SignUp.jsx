import { useState } from 'react';
import { useNavigate } from 'react-router';

const SignUp = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		skills: '',
		causes: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Signing Up...', formData);
		navigate('/login');
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-2xl shadow-lg w-96">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Create an Account
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Full Name"
						className="w-full p-2 border rounded-lg"
						value={formData.name}
						onChange={handleChange}
						required
					/>
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
					<input
						type="text"
						name="skills"
						placeholder="Skills (comma-separated)"
						className="w-full p-2 border rounded-lg"
						value={formData.skills}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="causes"
						placeholder="Causes (e.g., environment, education)"
						className="w-full p-2 border rounded-lg"
						value={formData.causes}
						onChange={handleChange}
					/>
					<button
						type="submit"
						className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
					>
						Sign Up
					</button>
				</form>
				<p className="text-center mt-4">
					Already have an account?
					<span
						className="text-indigo-600 cursor-pointer"
						onClick={() => navigate('/sign-in')}
					>
						Sign In
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
