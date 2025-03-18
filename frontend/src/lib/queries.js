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

export const postHelpRequest = async (data) => {
	const response = await axios.post(`${API_BASE_URL}/help-requests`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const getHelpRequests = async () => {
	const response = await axios.get(`${API_BASE_URL}/help-requests`);
	return response.data.data;
};
export const getHelpRequestById = async (id) => {
	const response = await axios.get(`${API_BASE_URL}/help-requests/${id}`);
	return response.data.data;
};
