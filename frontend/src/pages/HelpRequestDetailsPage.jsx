import Comments from '@/components/help/Comments';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getHelpRequestById } from '@/lib/queries';
import { useQuery } from '@tanstack/react-query';
import { UserRound } from 'lucide-react';
import { useParams } from 'react-router';

const urgencyVariants = {
	low: 'bg-blue-100 text-blue-800',
	medium: 'bg-yellow-100 text-yellow-800',
	urgent: 'bg-red-100 text-red-800',
};

const HelpRequestDetailsPage = () => {
	const { id } = useParams();

	const {
		data: request,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['help-request', id],
		queryFn: () => getHelpRequestById(id),
	});

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Something went wrong</div>;
	}
	return (
		<div className="max-w-3xl mx-auto p-4">
			{/* Request Details */}
			<Card className="mb-6">
				<CardHeader className="pb-4">
					<div className="flex justify-between items-center">
						<CardTitle>{request.title}</CardTitle>
						<Badge className={`${urgencyVariants[request.urgency]} capitalize`}>
							{request.urgency}
						</Badge>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
						<UserRound className="size-4" />
						<span>{request.author.name}</span>
					</div>
				</CardHeader>
				<div className="px-6 pb-4">
					<p className="text-gray-700">{request.description}</p>
				</div>
			</Card>

			{/* Comments Component */}
			<Comments helpRequestId={id} />
		</div>
	);
};

export default HelpRequestDetailsPage;
