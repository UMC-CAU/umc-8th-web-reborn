import { Link } from 'react-router-dom';

function Navbar() {
  const links = [
    { to: "/week0", label: "Week 0" },
    { to: "/week1", label: "Week 1" },
    { to: "/week2", label: "Week 2" },
    { to: "/week3", label: "Week 3" },
    { to: "/week4", label: "Week 4" },
    { to: "/week5", label: "Week 5" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">UMC_practice</Link>
      </div>
      <ul className="nav-menu">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;