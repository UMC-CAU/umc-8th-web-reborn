import './App.css';
import Todo from './components/todo/Todo';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeProvider';
import Navbar from './components/layout/Navbar';

function App() : React.ReactElement {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Navbar />
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
