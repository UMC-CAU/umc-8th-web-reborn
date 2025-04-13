import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';

const Signin = () => {
    const navigate = useNavigate();
    const { values, errors, touched, getInputProps, handleSubmit } = useForm<UserSigninInformation>({
        initialValue: {
            email: '',
            password: ''
        },
        validate: validateSignin
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
        // TODO: 실제 로그인 로직 구현
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        로그인
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                이메일
                            </label>
                            <input
                                {...getInputProps('email')}
                                type="email"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="이메일"
                            />
                            {touched.email && errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                비밀번호
                            </label>
                            <input
                                {...getInputProps('password')}
                                type="password"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="비밀번호"
                            />
                            {touched.password && errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            로그인
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/signup')}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signin; 