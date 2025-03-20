import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router';

const Profile = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	return (
		<Card className="w-full">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">
					Profile
				</CardTitle>
				<p className="text-center text-slate-600">View your profile details</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Avatar */}
					<div className="flex justify-center mb-4">
						<img
							src={user.avatar || 'https://placehold.co/400x400?text=No+Avatar'}
							alt="Avatar"
							className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
						/>
					</div>

					{/* Name */}
					<div className="space-y-1">
						<Label className="text-lg font-semibold">Name</Label>
						<p className="text-gray-700">{user.name}</p>
					</div>

					{/* Email */}
					<div className="space-y-1">
						<Label className="text-lg font-semibold">Email</Label>
						<p className="text-gray-700">{user.email}</p>
					</div>

					{/* Skills */}
					<div className="space-y-1">
						<Label className="text-lg font-semibold">Skills</Label>
						<p className="text-gray-700">{user.skills}</p>
					</div>

					{/* Interests */}
					<div className="space-y-1">
						<Label className="text-lg font-semibold">Interests</Label>
						<ul className="list-disc pl-6">
							{user.interests.map((interest, index) => (
								<li key={index} className="text-gray-700">
									{interest}
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-center p-4">
				<Button
					variant="link"
					className="p-0 h-auto font-medium cursor-pointer"
					onClick={() => navigate('/profile/edit')}
				>
					Edit Profile
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Profile;
