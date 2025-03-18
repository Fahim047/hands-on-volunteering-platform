import { format, isToday, isYesterday } from 'date-fns';

// Inside the CommentItem component:
export const formatTimestamp = (dateString) => {
	const date = new Date(dateString);

	if (isToday(date)) {
		return `Today at ${format(date, 'h:mm a')}`;
	} else if (isYesterday(date)) {
		return `Yesterday at ${format(date, 'h:mm a')}`;
	} else if (new Date().getFullYear() === date.getFullYear()) {
		return format(date, 'MMM d at h:mm a'); // Same year (Mar 15 at 2:30 PM)
	} else {
		return format(date, 'MMM d, yyyy at h:mm a'); // Different year
	}
};
