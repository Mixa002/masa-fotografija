// src/pages/AlbumDetails.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ALBUMS } from '../../data/MockData.js';
import Navbar from '../../components/Navbar.jsx';

const AlbumDetails = () => {
    const { id } = useParams();
    // Pronalazimo album koji ima isti ID kao onaj iz URL-a
    const album = MOCK_ALBUMS.find(a => a.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!album) return <p>Album nije pronađen.</p>;

    return (
        <>
            <Navbar />
            <div className="album-details-container" style={{ padding: '120px 5% 50px' }}>
                <div className="album-header" style={{ marginBottom: '50px' }}>
                    <Link to="/recent-works" style={{ textDecoration: 'none', color: '#999', fontSize: '0.8rem' }}>
                        ← NAZAD NA SVE ALBUME
                    </Link>
                    <h1 style={{ marginTop: '20px', fontWeight: '200', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                        {album.title}
                    </h1>
                </div>

                {/* Grid za sve slike iz tog albuma */}
                <div className="photo-grid" style={{
                    columnCount: window.innerWidth > 1000 ? 2 : 1, // Dve kolone na desktopu, jedna na mobilnom
                    columnGap: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {album.images.map((img, index) => (
                        <div key={index} className="photo-item" style={{
                            marginBottom: '20px',
                            breakInside: 'avoid', // Sprečava da slika bude presečena između kolona
                            overflow: 'hidden'
                        }}>
                            <img
                                src={img}
                                alt={`Slika ${index}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    transition: 'opacity 0.5s ease'
                                }}
                                className="hover-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AlbumDetails;