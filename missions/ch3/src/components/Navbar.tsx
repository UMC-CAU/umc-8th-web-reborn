import { Link, NavLink } from 'react-router-dom';

const LINKS = [
    { to: '/movie/popular', label: '인기 영화' },
    { to: '/movie/now_playing', label: '상영 중인 영화' },
    { to: '/movie/top_rated', label: '평점 높은 영화' },
    { to: '/movie/upcoming', label: '개봉 예정 영화' },
];

export default function Navbar() : React.ReactElement {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-2xl font-bold text-red-600">
                    Duck🦆Flix
                </Link>
                <div className="flex gap-6">
                    {LINKS.map(({ to, label }) : React.ReactElement => (
                        <NavLink 
                            to={to}
                            key={to} 
                            className={({ isActive }) => 
                                isActive 
                                    ? 'text-white font-bold' 
                                    : 'text-gray-300 hover:text-white transition-colors'
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
            <Link 
                to="/loading-spinner"
                className="text-gray-300 hover:text-white transition-colors"
            >
                강제 로딩스피너 실행
            </Link>
        </nav>
    );
}
