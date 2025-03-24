import { Button } from '@/components/ui/button';

export default function ErrorComponent({ message, onRetry }) {
	return (
		<div className="text-center text-red-500 p-4">
			<p className="mb-2">⚠️ {message || 'Something went wrong.'}</p>
			{onRetry && <Button onClick={onRetry}>Retry</Button>}
		</div>
	);
}
