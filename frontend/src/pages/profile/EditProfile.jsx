import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Pencil, Save, User } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function EditProfile() {
	const [editMode, setEditMode] = useState(false);
	const [activeTab, setActiveTab] = useState('profile');
	const [user, setUser] = useState({
		name: 'John Doe',
		email: 'johndoe@example.com',
		skills: 'Teaching, Organizing',
		interests: 'Education, Environment',
		points: 120,
		avatar: null,
	});
	const [avatar, setAvatar] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const fileInputRef = useRef(null);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (!file.type.startsWith('image/')) {
				toast.error('Please select an image file');
				return;
			}
			if (file.size > 2 * 1024 * 1024) {
				toast.error('Image size should be less than 2MB');
				return;
			}
			setAvatar(file);
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		setUser((prev) => ({
			...prev,
			avatar: previewUrl || prev.avatar,
		}));
		setEditMode(false);
		toast.success('Profile updated successfully!');
	};

	const removeAvatar = () => {
		setAvatar(null);
		setPreviewUrl(null);
		fileInputRef.current.value = '';
	};

	const triggerFileInput = () => {
		fileInputRef.current.click();
	};

	return (
		<main className="flex-1">
			<Card className="shadow-lg">
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-semibold">Profile Management</h2>
					<Button onClick={editMode ? handleSave : () => setEditMode(true)}>
						{editMode ? (
							<Save className="w-4 h-4 mr-2" />
						) : (
							<Pencil className="w-4 h-4 mr-2" />
						)}
						{editMode ? 'Save' : 'Edit'}
					</Button>
				</div>
				<CardContent className="p-6">
					<div className="flex items-center gap-6">
						{/* Avatar */}
						<div className="relative">
							<div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border flex items-center justify-center">
								{previewUrl || user.avatar ? (
									<img
										src={previewUrl || user.avatar}
										alt="Profile"
										className="w-full h-full object-cover"
									/>
								) : (
									<User className="w-16 h-16 text-gray-400" />
								)}
							</div>
							{editMode && (
								<Button
									size="sm"
									className="absolute bottom-0 right-0 rounded-full p-2 bg-indigo-600 hover:bg-indigo-700 text-white"
									onClick={triggerFileInput}
								>
									<Camera className="w-4 h-4" />
								</Button>
							)}
						</div>

						{/* Profile Info */}
						<div className="flex-1 space-y-4">
							<Input
								name="name"
								value={user.name}
								onChange={handleChange}
								disabled={!editMode}
							/>
							<Input
								name="email"
								value={user.email}
								disabled
								className="bg-gray-50"
							/>
							<Textarea
								name="skills"
								value={user.skills}
								onChange={handleChange}
								disabled={!editMode}
							/>
							<Textarea
								name="interests"
								value={user.interests}
								onChange={handleChange}
								disabled={!editMode}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
