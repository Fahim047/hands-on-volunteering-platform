import asyncHandler from '../utils/asyncHandler.js';

const updateUser = asyncHandler(async (req, res, next) => {
	const { name, avatar, skills, interests } = req.body;

	// Validate input data
	if (!name) {
		res.status(400);
		throw new Error('Name is required');
	}

	// Find the user by ID and update the fields (using findByIdAndUpdate)
	const updatedUser = await User.findByIdAndUpdate(
		req.user._id,
		{
			name: name,
			avatar: avatar || undefined,
			skills: skills || undefined,
			interests: interests || undefined,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedUser) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(200).json({
		success: true,
		message: 'User updated successfully',
		data: updatedUser,
	});
});
