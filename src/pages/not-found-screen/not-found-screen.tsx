import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
	const navigate = useNavigate();

	return (
		<div>
			404 Error! <button onClick={() => navigate(-1)}>Back</button>
		</div>
	);
};

export default NotFoundScreen;
