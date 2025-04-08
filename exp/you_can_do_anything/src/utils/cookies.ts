import Cookies from 'js-cookie';

// 쿠키 설정 함수
export const setUserToken = (token: string) => {
  Cookies.set("userToken", token, { expires: 7 });
};

// 쿠키 가져오기 함수
export const getUserToken = () => {
  return Cookies.get("userToken");
};

// 쿠키 삭제 함수
export const removeUserToken = () => {
  Cookies.remove("userToken");
};