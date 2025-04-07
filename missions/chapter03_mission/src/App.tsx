import './App.css';
import MoviePage from './pages/MoviePage';

function App() : React.ReactElement {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return (
    <>
      <h1 className="text-2xl text-amber-600">
        Hello World
      </h1>
      <MoviePage />
    </>
  );
}

export default App;
