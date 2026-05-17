import react, {useEffect} from 'react';
import {MOCK_ALBUMS} from "../../data/MockData.js";
import Navbar from "../../components/Navbar.jsx"
import "../../styles/RecentWorks.css"
import {Link} from "react-router-dom"
const RecentWorks = () => {
    const publicAlbums = MOCK_ALBUMS.filter(album => album.isPublic);
    useEffect(() => {
        window.scrollTo(0,0)
    }, []);
    return(
        <>
            <Navbar/>
            <div className="recent-works-container">
                <header className="section-header">
                    <h1>Recent work</h1>
                </header>
                <div className="album-grid">
                    {publicAlbums.map((album) => (
                        /* 1. Dodajemo 'to' putanju sa ID-em albuma */
                        /* 2. Prebacujemo 'key' ovde jer je Link sada glavni roditelj u nizu */
                        <Link to={`/album/${album.id}`} key={album.id} className="album-card-link" style={{ textDecoration: 'none' }}>
                            <div className="album-card">
                                <div className="image-wrapper">
                                    <img src={album.coverImage} alt={album.title} className="album-image"/>
                                </div>
                                <div className="album-info">
                                    <div>
                                        <span className="album-category">{album.category}</span>
                                        <h2 className="album-title">{album.title}</h2>
                                    </div>
                                    <span className="album-date">{album.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>

    )
}

export default RecentWorks;