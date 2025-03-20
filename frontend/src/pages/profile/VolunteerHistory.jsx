import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

const VolunteerHistory = () => {
	const {
		data: volunteerHistory,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['volunteerHistory'],
		queryFn: async () => [],
	});
	return (
		<Card className="shadow-lg">
			<CardContent className="p-6">
				<h2 className="text-xl font-semibold mb-4">Volunteer History</h2>
				{isPending ? (
					<p>Loading...</p>
				) : isError ? (
					<p>Error loading data.</p>
				) : (
					<table className="w-full border-collapse border">
						<thead>
							<tr className="bg-gray-100">
								<th className="p-3 border">Event</th>
								<th className="p-3 border">Date</th>
								<th className="p-3 border">Role</th>
							</tr>
						</thead>
						<tbody>
							{volunteerHistory.map((entry, idx) => (
								<tr key={idx} className="text-center">
									<td className="p-3 border">{entry.event}</td>
									<td className="p-3 border">{entry.date}</td>
									<td className="p-3 border">{entry.role}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</CardContent>
		</Card>
	);
};

export default VolunteerHistory;
