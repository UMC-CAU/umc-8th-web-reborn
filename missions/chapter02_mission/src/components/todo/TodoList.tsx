import React from 'react';
import { TTodo } from '../../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    title: string;
    todos: TTodo[];
    buttonLabel: string;
    buttonColor: string;
    onClick: (todo: TTodo) => void;
}

const TodoList = ({
    title, 
    todos, 
    buttonLabel,
    buttonColor,
    onClick
}: TodoListProps): React.ReactElement => {
    return (
        <div className="render-container__section">
            <h2 className="render-container__title">{title}</h2>
            <ul id='todo-list' className="render-container__list">
                {todos.map((todo): React.ReactElement => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onClick={onClick}
                        buttonLabel={buttonLabel}
                        buttonColor={buttonColor}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList; 