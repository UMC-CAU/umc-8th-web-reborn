import './App.css';
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';

const Layout = () : React.ReactElement => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movie/:category',
        element: <MoviePage />,
      },
      {
        path: 'movie/:category/:movieId',
        element: <MovieDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() : React.ReactElement {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
