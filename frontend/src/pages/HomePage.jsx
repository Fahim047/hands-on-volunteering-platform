import UpComingEventSection from '@/components/sections/UpComingEventSection';
import { useAuth } from '@/hooks';

const HomePage = () => {
	const { user } = useAuth();
	console.log(user);
	return (
		<div className="py-12">
			<UpComingEventSection />
		</div>
	);
};

export default HomePage;
