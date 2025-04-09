import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoadingSpinnerPage() : React.ReactElement {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <div className="mb-8">
                <LoadingSpinner />
            </div>
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                뒤로 가기
            </button>
        </div>
    );
} 