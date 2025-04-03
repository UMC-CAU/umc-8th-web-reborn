import { createContext, PropsWithChildren, useState, useContext } from 'react';
import { TTodo } from '../types/todo';

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

export { TodoContext };

export const TodoProvider = ({ children }: PropsWithChildren): React.ReactElement => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    

    const addTodo = (text: string) : void => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };
    
    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos): TTodo[] => prevTodos.filter((t): boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodos): TTodo[] => 
            prevDoneTodos.filter((t): boolean => t.id !== todo.id)
        );
    };
    
    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () : ITodoContext => {
    const context = useContext(TodoContext);
    // 컨텍스트가 없는 경우
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }

    // 컨텍스트가 있는 경우
    return context;
};