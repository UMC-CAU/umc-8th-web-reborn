import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { postSignup } from "../apis/auth"

const schema = z.object({
    email: z.string().email({message: "유효한 이메일 주소를 입력하세요."}),
    password: z
    .string()
    .min(8,{message:'비밀번호는 8자 이상이여야 합니다.'})
    .max(20,{message:'비밀번호는 20자 이하이여야 합니다.'}),

    passwordCheck: z
    .string()
    .min(8,{message:'비밀번호는 8자 이상이여야 합니다.'})
    .max(20,{message:'비밀번호는 20자 이하이여야 합니다.'}),

    name: z
    .string()
    .min(1,{message:'이름을 입력하세요.'}),
    
})    .refine((data)=> data.password === data.passwordCheck,
{message:'비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
})

type formFields = z.infer<typeof schema> //제네릭이라 타입을 추론해 줘야 함!! 

const SignupPage = () => {
    const {register,handleSubmit,formState:{errors, isSubmitting}} = useForm<formFields>({
        defaultValues:{
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onBlur",
    })

    const onSubmit : SubmitHandler<formFields> = async(data) => {
        const {passwordCheck, ...rest} = data

        const response = await postSignup(rest)
        console.log(response)
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input
                {...register("email")}
                type={"emial"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] 
                ${errors?.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'이메일'}
                />
                {errors?.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                <input 
                {...register("password")}
                type={"password"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] 
                    ${errors?.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'비밀번호'}/>
                {errors?.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                <input 
                {...register("passwordCheck")}
                type={"password"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] 
                    ${errors?.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'비밀번호 확인'}/>
                {errors?.passwordCheck && <span className="text-red-500 text-sm">{errors.passwordCheck.message}</span>}

                <input 
                {...register("name")}
                type={"name"} 
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] 
                    ${errors?.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={'이름'}/>
                {errors?.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                <button 
                disabled={isSubmitting}
                type="button" 
                onClick={handleSubmit(onSubmit)} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed">
                    회원가입
                </button>
            </div>
        </div>
    )
}

export default SignupPage