import { TTodo } from "../types/todo";

export const getTodoList = async (): Promise<TTodo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
        {
          id: 1,
          text: "Todo 1",
          checked: false,
        },
        {
          id: 2,
          text: "Todo 2",
          checked: true,
        },
      ]);
    }, 1_000);
  });
};
