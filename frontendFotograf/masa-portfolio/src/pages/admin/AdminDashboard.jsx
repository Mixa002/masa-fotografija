import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx'; // Proveri da li ti je ovde tačna putanja do konteksta
import { useNavigate } from 'react-router-dom';
import '../../styles/adminDashboard.css'; // Obavezno proveri veliko/malo slovo u nazivu fajla (adminDashboard.css)

const AdminDashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard-container">
            {/* Gornji deo: Naslov i Korisnik/Logout */}
            <header className="admin-header">
                <h1>Dashboard</h1>
                <div className="admin-profile">
                    <span className="admin-username">Zdravo, {user?.username}</span>
                    <button onClick={handleLogout} className="admin-logout-btn">
                        Log out
                    </button>
                </div>
            </header>

            {/* Glavni radni prostor podeljen u dve kolone */}
            <div className="admin-grid">

                {/* Leva kolona: Kreiranje albuma */}
                <section className="admin-section">
                    <h3>Kreiraj novi album</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="admin-form-group">
                            <label>Naziv albuma</label>
                            <input type="text" className="admin-input" placeholder="npr. Venčanje Petra i Milice" />
                        </div>
                        <div className="admin-checkbox-group">
                            <input type="checkbox" id="private" />
                            <span htmlFor="private">Ovo je privatan album (za klijenta)</span>
                        </div>
                        <button type="submit" className="admin-submit-btn">Kreiraj Album</button>
                    </form>
                </section>

                {/* Desna kolona: Upload slika */}
                <section className="admin-section">
                    <h3>Dodaj slike u album</h3>
                    <div className="admin-form-group">
                        <label>Izaberi album</label>
                        <select className="admin-select">
                            <option value="">-- Izaberi album --</option>
                        </select>
                    </div>
                    <div className="file-drop-zone">
                        <p>Prevucite fotografije ovde ili kliknite za upload</p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AdminDashboard;