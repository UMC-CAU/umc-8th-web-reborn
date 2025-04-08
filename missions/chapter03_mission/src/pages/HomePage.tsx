import { Outlet } from 'react-router-dom';

export default function HomePage() : React.ReactElement {
    return (
        <div>
            <h1>HomePage</h1>
            <Outlet />
        </div>
    );
};  
