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

// export const postComment = async(data) => {
// 	const response = await axios.post(`${API_BASE_URL}/comments`, data)
// }
export const getCommentsByHelpRequestId = async (id) => {
	const response = await axios.get(
		`${API_BASE_URL}/help-requests/${id}/comments`
	);
	return response.data.data;
};
export const postComment = async (postId, data) => {
	const response = await axios.post(
		`${API_BASE_URL}/help-requests/${postId}/comments`,
		data
	);
	return response.data;
};
export const postReply = async (commentId, data) => {
	console.log(commentId, data);
	const response = await axios.post(
		`${API_BASE_URL}/comments/${commentId}/reply`,
		data
	);
	return response.data;
};
