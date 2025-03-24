import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingSkeleton() {
	return (
		<div className="w-full space-y-4">
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="p-4 border rounded-lg shadow">
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-4 w-1/2 mb-1" />
					<Skeleton className="h-4 w-full" />
				</div>
			))}
		</div>
	);
}
