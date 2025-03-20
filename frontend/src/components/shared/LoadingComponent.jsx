import { Loader2 } from 'lucide-react';

const LoadingComponent = () => {
	return (
		<div className="h-screen w-full flex items-center justify-center gap-2 text-3xl">
			<Loader2 size={36} className="animate-spin" />
			<h4>Loading...</h4>
		</div>
	);
};

export default LoadingComponent;
