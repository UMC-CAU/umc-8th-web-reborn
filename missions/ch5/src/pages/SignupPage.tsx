import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { SignupFormData, signupSchema } from '../types/auth';
import { ZodError } from 'zod';

const SignupPage = (): React.ReactElement => {
    const navigate = useNavigate();
    const { values, errors, touched, getInputProps, handleSubmit } = useForm<SignupFormData>({
        initialValue: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            try {
                signupSchema.parse(values);
                return {
                    email: null,
                    password: null,
                    confirmPassword: null
                };
            } catch (error) {
                if (error instanceof ZodError) {
                    return {
                        email: error.issues.find(e => e.path[0] === 'email')?.message || null,
                        password: error.issues.find(e => e.path[0] === 'password')?.message || null,
                        confirmPassword: error.issues.find(e => e.path[0] === 'confirmPassword')?.message || null
                    };
                }
                return {
                    email: '유효성 검사 오류',
                    password: '유효성 검사 오류',
                    confirmPassword: '유효성 검사 오류'
                };
            }
        }
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e);
        
        // 에러가 없는 경우에만 회원가입 처리
        if (Object.values(errors).every(error => error === null)) {
            // TODO: 회원가입 API 호출
            console.log('회원가입 시도:', values);
            navigate('/login');
        }
    };

    const isDisabled = useMemo(() => {
        return Object.values(errors).some(error => error !== null);
    }, [errors]);

    const inputClassName = (fieldName: keyof SignupFormData) => `
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
                        회원가입
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

                            <input
                                {...getInputProps("confirmPassword")}
                                type="password"
                                className={inputClassName("confirmPassword")}
                                placeholder="비밀번호 확인"
                            />
                            {errors?.confirmPassword && touched?.confirmPassword && (
                                <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            회원가입
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            이미 계정이 있으신가요? 로그인하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;