import { Link, NavLink } from 'react-router-dom';

const LINKS = [
    { to: '/', label: 'Home' },
    { to: '/movie/popular', label: '인기 영화' },
    { to: '/movie/now_playing', label: '상영 중인 영화' },
    { to: '/movie/top_rated', label: '평점 높은 영화' },
    { to: '/movie/upcoming', label: '개봉 예정 영화' },
];

export default function Navbar() : React.ReactElement {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800">
            <Link to="/" className="text-2xl text-amber-600">
                Movie App
            </Link>
            <div className="flex gap-4">
                {LINKS.map(({ to, label }) : React.ReactElement => (
                    <NavLink 
                        to={to}
                        key={to} 
                        className={({ isActive }) => 
                            isActive 
                                ? 'text-amber-600 font-bold' 
                                : 'text-gray-300 hover:text-white'
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
