import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Pencil, Save, Upload, User, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function ProfileManagement() {
	const [editMode, setEditMode] = useState(false);
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
			// Check file type
			if (!file.type.startsWith('image/')) {
				toast.error('Please select an image file');
				return;
			}

			// Check file size (max 2MB)
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
		// Here you would typically send the data to your backend
		// For now, we'll just update the local state and show a success message
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
		<div className="max-w-2xl mx-auto p-6">
			<Card className="shadow-lg">
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-semibold flex items-center gap-2">
						<User className="w-6 h-6" /> Profile Management
					</h2>
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
					<div className="flex flex-col gap-6">
						{/* Avatar Section */}
						<div className="flex flex-col items-center space-y-4">
							<div className="relative">
								<div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
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
									<div className="absolute bottom-0 right-0">
										<Button
											size="sm"
											className="rounded-full p-2 bg-indigo-600 hover:bg-indigo-700 text-white"
											onClick={triggerFileInput}
										>
											<Camera className="w-4 h-4" />
										</Button>
									</div>
								)}
							</div>

							{editMode && (
								<div className="w-full space-y-2">
									<input
										type="file"
										accept="image/*"
										className="hidden"
										ref={fileInputRef}
										onChange={handleFileChange}
									/>

									<Button
										variant="outline"
										className="w-full flex items-center justify-center"
										onClick={triggerFileInput}
									>
										<Upload className="w-4 h-4 mr-2" />
										Change Avatar
									</Button>

									{previewUrl && (
										<Button
											variant="outline"
											className="w-full flex items-center justify-center text-red-500 hover:text-red-600"
											onClick={removeAvatar}
										>
											<X className="w-4 h-4 mr-2" />
											Remove
										</Button>
									)}
								</div>
							)}

							<div className="bg-gray-50 p-3 rounded-md text-center">
								<p className="text-sm font-medium">Impact Points</p>
								<p className="text-lg font-bold text-indigo-600">
									{user.points} Points
								</p>
							</div>
						</div>

						{/* Profile Details */}
						<div className="flex-1 space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Name</label>
								<Input
									name="name"
									value={user.name}
									onChange={handleChange}
									disabled={!editMode}
									className="w-full"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Email</label>
								<Input
									name="email"
									value={user.email}
									disabled
									className="w-full bg-gray-50"
								/>
								<p className="text-xs text-gray-500 mt-1">
									Email cannot be changed
								</p>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Skills</label>
								<Textarea
									name="skills"
									value={user.skills}
									onChange={handleChange}
									disabled={!editMode}
									className="w-full"
									rows={3}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Interests
								</label>
								<Textarea
									name="interests"
									value={user.interests}
									onChange={handleChange}
									disabled={!editMode}
									className="w-full"
									rows={3}
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
