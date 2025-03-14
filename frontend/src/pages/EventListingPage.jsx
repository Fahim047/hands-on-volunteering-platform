import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const EventListingPage = () => {
	return (
		<div>
			<Button asChild>
				<Link to="/events/create">Create new event</Link>
			</Button>
		</div>
	);
};

export default EventListingPage;
