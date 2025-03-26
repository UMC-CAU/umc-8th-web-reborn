import React, { useState } from 'react';

// 여기서 import React 빼도 되나,,?

type TodoFormProps = {
  onAddTodo: (todo: string) => void;
};

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일을 입력해주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">추가</button>
    </form>
  );
}

export default TodoForm;