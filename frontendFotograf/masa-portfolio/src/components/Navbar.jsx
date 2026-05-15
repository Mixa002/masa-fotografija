import React from 'react';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
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
                        <Link to="/recent-works">Recent works</Link>
                    </li>
                    <li className="link">
                        <Link to="/your-albums">Your albums</Link>
                    </li>
                </ul>
                <ul className="login">
                    <li className="link">
                        <Link to="/login">Log in</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;