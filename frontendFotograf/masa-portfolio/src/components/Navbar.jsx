import React , {useContext} from 'react';
import '../styles/Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.jsx'

const Navbar = () => {

    const { user, logout, isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Briše token iz localStorage i postavlja user stanje na null
        navigate('/login'); // Preusmeravamo ga na login nakon odjave
    };
    return (
        <nav className="nav">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    MAŠA ILIĆ
                </Link>
            </div>
            <div className="rightSection">
                <ul className="navLinks">
                    <li className="link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="link">
                        <Link to="/recent-works">Recent work</Link>
                    </li>
                    {/* Link "Your album" se vidi samo ako je neko ulogovan (bio to admin ili klijent) */}
                    {user && (
                        <li className="link">
                            <Link to="/your-albums">Your album</Link>
                        </li>
                    )}
                    {/* AKO JE ULOGOVAN ADMIN (MAŠA): Prikazuje se link za Admin Dashboard */}
                    {isAdmin() && (
                        <li className="link admin-link-highlight">
                            <Link to="/admin/dashboard" style={{ color: '#d4af37', fontWeight: 'bold' }}>⚙️ Admin</Link>
                        </li>
                    )}
                </ul>
                <ul className="login">
                    <li className="link">
                        {user ? (
                            // Ako je ulogovan, prikaži Logout dugme koje okida naš čist handleLogout
                            <button
                                onClick={handleLogout}
                                className="nav-logout-btn-text"
                                // style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                            >
                                Log Out ({user.username})
                            </button>
                        ) : (
                            // Ako nije ulogovan, prikazuje se Log In link
                            <Link to="/login">Log In</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;