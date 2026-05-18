import React,{useContext, useState, useEffect} from 'react'
import {AuthContext} from "../../context/AuthContext.jsx"
import axios from 'axios'
import {Link} from 'react-router-dom'
import "../../styles/YourAlbums.css"

const YourAlbums = () => {
    const {user} = useContext(AuthContext)
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState('');

    useEffect(() => {
        const fetchMyAlbums = async () =>{
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/albums/my-albums',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAlbums(response.data);
            }catch (err){
                console.log("Greska pri ucitavanja privatnih albuma: " + err);
                setError("Nije uspelo ucitavanje privatnih albuma.")
                // MOCK PODACI ZA TESTIRANJE (Skloni ovo čim pustiš backend rutu u rad)
                // Služi nam da vidiš kako stranica izgleda pre nego što napišeš kontroler
                setAlbums([
                    { id: 1, name: "Svadba Petra & Milice", coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500", date: "12.05.2026." },
                    { id: 2, name: "Prewedding Session", coverImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500", date: "20.04.2026." }
                ]);
            }finally {
                setLoading(false);
            }
        };
        fetchMyAlbums();
    }, []);


    if (loading) return <div className="loading-container">Učitavanje Vaših albuma...</div>;

    return (
        <div className="your-albums-container">
            <header className="albums-header">
                <h2>Vaši Albumi</h2>
                <p className="welcome-text">Dobrodošli nazad, <strong>{user?.username}</strong>. Ovde možete pogledati i preuzeti Vaše fotografije.</p>
            </header>

            {error && <div className="error-banner">{error}</div>}

            {albums.length === 0 ? (
                <div className="no-albums">
                    <p>Trenutno nemate dodeljenih albuma. Kontaktirajte Mašu za više informacija.</p>
                </div>
            ) : (
                <div className="albums-grid">
                    {albums.map((album) => (
                        <Link to={`/album/${album.id}`} key={album.id} className="album-card-link">
                            <div className="album-card">
                                <div className="album-image-wrapper">
                                    <img src={album.coverImageUrl} alt={album.name} />
                                    <div className="album-overlay">
                                        <span>Pogledaj fotografije</span>
                                    </div>
                                </div>
                                <div className="album-info">
                                    <h3>{album.name}</h3>
                                    <span className="album-date">{album.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};


export default YourAlbums;