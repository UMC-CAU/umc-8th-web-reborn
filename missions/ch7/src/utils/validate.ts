export type UserSigninInformation = {
    email: string;
    password: string;
}

function validateUser(values:UserSigninInformation){
    const errors = {
        email: "",
        password: ""
    }

    if(!/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
        errors.email = "올바른 이메일 형식이 아닙니다."
    }

    if(!(values.password.length >= 8 && values.password.length < 20) ){
        errors.password = "비밀번호는 8~20자 사이로 입력해주세요."
    }

    return errors
}

function validateSignin (values:UserSigninInformation) {
    return validateUser(values)
}

export default validateSignin