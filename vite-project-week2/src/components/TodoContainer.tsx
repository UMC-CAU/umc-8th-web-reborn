import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function TodoContainer() {
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const addTodo = (todo: string) => {
    setTodos([...todos, todo]);
  };

  const completeTodo = (index: number) => {
    const completed = todos[index];
    setCompletedTodos([...completedTodos, completed]);
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">2주차 TODO</h1>
      <TodoForm onAddTodo={addTodo} />
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <TodoList todos={todos} onCompleteTodo={completeTodo} />
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {completedTodos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoContainer;