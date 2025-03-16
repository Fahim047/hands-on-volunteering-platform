import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const user = localStorage.getItem('user');
const token = JSON.parse(user).token;

export const joinEvent = async (eventId) => {
	const response = await axios.patch(
		`${API_BASE_URL}/events/${eventId}/join`,
		null,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};
