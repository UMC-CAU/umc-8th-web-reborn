import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import Movies from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'movies/:movieId',
                element: <Movies/>
            }
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
