import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { values, errors, touched, getInputProps, handleSubmit } = useForm<UserSigninInformation>({
        initialValue: {
            email: '',
            password: ''
        },
        validate: validateSignin
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const isValid = await handleSubmit(e);
        
        if (isValid) {
            try {
                setIsLoading(true);
                await login(values);
            } catch (error) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const isDisabled = useMemo(() => {
        return Object.values(errors).some(error => error !== null) || isLoading;
    }, [errors, isLoading]);

    const inputClassName = (fieldName: "email" | "password") => `
        border border-[#ccc] 
        w-[300px] 
        p-[10px] 
        rounded-sm
        focus:border-[#807bff]
        ${errors?.[fieldName] && touched?.[fieldName] 
            ? "border-red-500 bg-red-200" 
            : "border-gray-300"}
    `;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        로그인
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="flex flex-col gap-3">
                            <input
                                {...getInputProps("email")}
                                type="email"
                                className={inputClassName("email")}
                                placeholder="이메일"
                            />
                            {errors?.email && touched?.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}
                            
                            <input
                                {...getInputProps("password")}
                                type="password"
                                className={inputClassName("password")}
                                placeholder="비밀번호"
                            />
                            {errors?.password && touched?.password && (
                                <div className="text-red-500 text-sm">{errors.password}</div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            계정이 없으신가요? 회원가입하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;