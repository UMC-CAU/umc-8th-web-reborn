import { TLogin } from "../types/auth";

const USER_DB = [{ username: "test", password: "1234" }];

export const login = async ({
  username,
  password,
}: TLogin): Promise<{ username: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USER_DB.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        document.cookie = `token=${user.username}`;
        resolve({ username: user.username });
      } else {
        reject(new Error("로그인 실패"));
      }
    }, 1_000);
  });
};
