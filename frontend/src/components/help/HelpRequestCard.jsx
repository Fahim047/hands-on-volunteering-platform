import { UserRound } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

const HelpRequestCard = ({ request }) => {
	const urgencyColors = {
		low: 'bg-blue-100 text-blue-800',
		medium: 'bg-yellow-100 text-yellow-800',
		urgent: 'bg-red-100 text-red-800',
	};

	return (
		<Card className="overflow-hidden shadow-sm py-4">
			<CardHeader>
				<div className="flex justify-between items-start">
					<CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
						{request.title}
					</CardTitle>
					<Badge className={`capitalize ${urgencyColors[request.urgency]}`}>
						{request.urgency}
					</Badge>
				</div>
				<CardDescription className="flex items-center gap-2 text-sm text-gray-500 mt-2">
					<UserRound className="size-4" />
					Posted by {request?.author?.name || 'Anonymous'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-gray-600 line-clamp-3">
					{request.description}
				</p>
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<div className="text-sm text-gray-500">
					<span className="font-medium">{request.responses}</span> responses
				</div>
				<Button asChild variant="outline" size="sm">
					<Link to={`/help-requests/${request.id}`}>Offer Help</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default HelpRequestCard;
