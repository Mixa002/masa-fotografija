import react from 'react'
import '../styles/HeroPhotoSection.css'
import heroImage from "../assets/hero.jpeg"
import {Link} from "react-router-dom"
// import { useNavigate } from 'react-router-dom'; // Za navigaciju

const HeroPhotoSection = () => {
    // const navigate = useNavigate();
    return(
        <section className= "hero">
            <img src={heroImage} className="heroImg" />
            {/*<h1 className="title">Slike koje pricaju price</h1>*/}
            {/*<div className= "overlay">*/}
            {/*    <div className= "content">*/}
            {/*        <p className= "text">Upoznaj sa mnom grad koji svi volimo</p>*/}
            {/*        <Link to="/recent-works" style={{ textDecoration: 'none' }}>*/}
            {/*            <button className="cta-button">*/}
            {/*                Pogledaj albume*/}
            {/*            </button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    );
};



export default HeroPhotoSection;