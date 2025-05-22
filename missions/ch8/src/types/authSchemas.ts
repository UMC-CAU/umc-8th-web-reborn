import { z } from "zod";

// 로그인 폼 데이터 유효성 검사 스키마
export const signinSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }), // 필요에 따라 최소 길이나 다른 제약 조건 추가
});

export type SigninFormData = z.infer<typeof signinSchema>;

// 회원가입 폼 데이터 유효성 검사 스키마
export const signupSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력하세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),

    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이여야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),

    name: z.string().min(1, { message: "이름을 입력하세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"], // passwordCheck 필드에 오류 메시지 연결
  });

export type SignupFormData = z.infer<typeof signupSchema>; 