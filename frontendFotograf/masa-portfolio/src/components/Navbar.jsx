import React from 'react';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return(
        <nav className= "nav" >
            <div className= "logo">
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
                    <li className="link">
                        <Link to="/your-albums">Your album</Link>
                    </li>
                </ul>
                <ul className="login">
                    <li className="link">
                        {isLoggedIn ? (
                            // Ako je ulogovan, prikaži Your Albums i Logout dugme
                            <>
                                <button onClick={() => {
                                    localStorage.clear(); // Briše sesiju
                                    window.location.reload(); // Osvežava da Navbar skapira promenu
                                }} className="nav-logout-btn-text">Logout</button>
                            </>
                        ) : (
                            // Ako nije ulogovan, samo tada se vidi Login link
                            <Link to="/login">Log In</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;