export type UserSigninInformation = {
    email: string;
    password: string;
}

export type UserSignupInformation = {
    email: string;
    password: string;
    confirmPassword: string;
}

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '이메일을 입력해주세요';
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다';
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return '비밀번호를 입력해주세요';
    if (!(password.length >= 8 && password.length <= 20)) return '비밀번호는 8자 이상 20자 이하여야 합니다';
    return null;
};

export const validateSignin = (values: UserSigninInformation): Record<keyof UserSigninInformation, string | null> => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };
};

export const validateSignup = (values: UserSignupInformation): Record<keyof UserSignupInformation, string | null> => {
    const errors = {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        confirmPassword: null as string | null
    };

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    return errors;
};