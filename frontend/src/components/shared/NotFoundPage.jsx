import { HomeIcon, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';

const NotFoundPage = ({
	code = 404,
	message = 'Page not found',
	description = "Sorry, we couldn't find the page you're looking for.",
}) => {
	const navigate = useNavigate();

	return (
		<div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-4">
			{/* Error Animation Container */}
			<div className="mb-8 relative">
				<div className="text-8xl md:text-9xl font-bold text-darkText dark:text-primary animate-bounce">
					{code}
				</div>
				<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
			</div>

			{/* Error Message */}
			<h1 className="text-2xl md:text-3xl font-semibold text-darkText dark:text-neutral mb-2 text-center">
				{message}
			</h1>
			<p className="text-subtleText mb-8 text-center max-w-md">{description}</p>

			{/* Action Buttons */}
			<div className="flex flex-col sm:flex-row gap-4">
				<button
					onClick={() => navigate('/')}
					className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
				>
					<HomeIcon className="w-4 h-4" />
					<span>Go Home</span>
				</button>
				<button
					onClick={() => window.location.reload()}
					className="flex items-center justify-center gap-2 px-6 py-2 bg-white text-darkText border border-neutral rounded-lg hover:bg-neutral transition-colors"
				>
					<RefreshCw className="w-4 h-4" />
					<span>Try Again</span>
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
