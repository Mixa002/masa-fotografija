import React from 'react';
import '../styles/Navbar.css'

const Navbar = () => {
    return(
        <nav className= "nav" >
            <div className= "logo">
                MAŠA ILIĆ
            </div>
            <div className= "rightSection">
                <ul className= "navLinks">
                    <li className= "link">Home</li>
                    <li className= "link">Recent works</li>
                    <li className= "link">Your albums</li>
                </ul>
                <ul className="login">
                    <li className= "link">Log in</li>
                </ul>
            </div>
        </nav>
    );
};


export default Navbar;