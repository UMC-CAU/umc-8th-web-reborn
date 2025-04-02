
type TodoListProps = {
  todos: string[];
  onCompleteTodo: (index: number) => void;
};

function TodoList({ todos, onCompleteTodo }: TodoListProps) {
  return (
    <ul id="todo-list" className="render-container__list">
      {todos.map((todo, index) => (
        <li key={index} className="todo-item">
          {todo}
          <button onClick={() => onCompleteTodo(index)}>완료</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;