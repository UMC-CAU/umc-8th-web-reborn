import { useState, useEffect } from "react";
import { TTodo } from "../types/todo";
import { getTodoList } from "../apis/todo";

function TodoList() {
  const [text, setText] = useState<string>("");
  const [todoList, setTodoList] = useState<TTodo[]>([]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    setTodoList((prev) => [
      ...prev,
      { id: prev.length + 1, text, checked: false },
    ]);
    setText("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleChangeTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  useEffect(() => {
    const fetchTodoList = async () => {
      const result = await getTodoList();
      setTodoList(result);
    };

    fetchTodoList();
  }, []);

  console.log(todoList);
  return (
    <>
      <div>
        <input type="text" value={text} onChange={handleChangeText} />
        <button onClick={handleAddTodo}>추가</button>
      </div>

      {todoList.map((todo) => (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
          }}
          key={todo.id}>
          <input
            type="checkbox"
            id={String(todo.id)}
            defaultChecked={todo.checked}
            onChange={() => handleChangeTodo(todo.id)}
          />
          <label htmlFor={String(todo.id)}>{todo.text}</label>
          <button
            data-testid={`delete-button-${todo.id}`}
            onClick={() => handleDeleteTodo(todo.id)}>
            삭제
          </button>
        </div>
      ))}
    </>
  );
}

export default TodoList;
