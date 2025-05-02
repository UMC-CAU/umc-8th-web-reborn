import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { api } from '../apis/axios';

interface GoogleLoginProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const GoogleLogin = ({ onSuccess, onError }: GoogleLoginProps) => {
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await api.post('/auth/google', {
          accessToken: response.access_token,
        });
        
        login(data);
        onSuccess?.();
      } catch (error) {
        console.error('Google login failed:', error);
        onError?.('Google 로그인에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('Google OAuth error:', error);
      onError?.('Google 로그인 중 오류가 발생했습니다.');
    },
  });

  return (
    <button
      onClick={() => handleGoogleLogin()}
      className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
    >
      <img
        src="/google.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      Google로 로그인
    </button>
  );
}; 