import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList.tsx';
import { useTodo } from '../../context/TodoContext';
import { useTheme } from '../../context/ThemeProvider';
import { THEME } from '../../context/themeConstants';
import clsx from 'clsx';

const Todo = (): React.ReactElement => {
    const [input, setInput] = useState<string>("");
    const { todos, doneTodos, addTodo, completeTodo, deleteTodo } = useTodo();
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            addTodo(text);
            setInput("");
        }
    };

    return (
        <div className={clsx("todo-container w-[1600px] mx-auto p-6", {
            "bg-white text-black": isLightMode,
            "bg-gray-800 text-white": !isLightMode
        })}>
            <h1 className="todo-container__header">Duck Todo</h1>
            <TodoForm 
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
            />
            <div className="render-container flex gap-4">
                <TodoList
                    title="할 일"
                    todos={todos}
                    buttonLabel="완료"
                    buttonColor="green"
                    onClick={completeTodo}
                />
                <TodoList
                    title="완료된 일"
                    todos={doneTodos}
                    buttonLabel="삭제"
                    buttonColor="red"
                    onClick={deleteTodo}
                />
            </div>
        </div>
    );
};

export default Todo;

export type TTodo = {
    id: number;
    text: string;
    completed: boolean;
};


