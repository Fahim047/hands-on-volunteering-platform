import { HomeIcon, RefreshCw } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router';

const ErrorPage = () => {
	const navigate = useNavigate();
	const error = useRouteError();

	// Extract error information
	const errorCode = error?.status || 500;
	const errorMessage =
		error?.statusText || error?.message || 'An unexpected error occurred.';
	const errorDescription =
		error?.data?.message ||
		"Sorry, something went wrong. We're working to fix it.";

	return (
		<div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-4">
			{/* Error Code Display */}
			<div className="mb-8 relative">
				<div className="text-8xl md:text-9xl font-bold text-darkText animate-bounce">
					{errorCode}
				</div>
				<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
			</div>

			{/* Error Message */}
			<h1 className="text-2xl md:text-3xl font-semibold text-darkText mb-2 text-center">
				{errorMessage}
			</h1>
			<p className="text-subtleText mb-8 text-center max-w-md">
				{errorDescription}
			</p>

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

export default ErrorPage;
