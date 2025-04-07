import React from 'react';
import { TTodo } from '../../types/todo';
import clsx from 'clsx';

interface TodoItemProps {
    todo: TTodo;
    onClick: (todo: TTodo) => void;
    buttonLabel: string;
    buttonColor: string;
}

const TodoItem = ({ todo, onClick, buttonLabel, buttonColor }: TodoItemProps): React.ReactElement => {
    return (
        <li className="render-container__item">
            <span className="render-container__item-text flex-1 break-words">{todo.text}</span>
            <button 
                onClick={(): void => onClick(todo)}
                className={clsx(
                    'px-4 py-2 rounded-md text-white transition-colors duration-200 whitespace-nowrap',
                    {
                        'bg-green-500 hover:bg-green-600': buttonColor === 'green',
                        'bg-red-500 hover:bg-red-600': buttonColor === 'red'
                    }
                )}
            >
                {buttonLabel}
            </button>
        </li>
    );
};

export default TodoItem; 