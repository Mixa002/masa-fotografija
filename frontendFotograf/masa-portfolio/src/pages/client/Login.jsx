import React, {useState,useEffect,useContext} from "react";
import {useNavigate} from 'react-router-dom';
import '../../styles/Login.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from 'axios';
import {MOCK_USERS} from "../../data/MockData.js"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {user,login, isAdmin} = useContext(AuthContext);

    useEffect(() => {
        // Ako Context prepozna da je korisnik ulogovan (jer ima validan token)
        if (user) {
            if (isAdmin()) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [user, isAdmin, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // 1. Šaljemo pravi zahtev na tvoj Spring Boot backend
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username, // šalje se "username" umesto "email"
                password
            });

            // 2. Iz AuthResponseDTO uzimamo generisani JWT token
            const token = response.data.token;

            // 3. Pozivamo login funkciju iz Context-a koja će:
            //    - Sačuvati token u localStorage
            //    - Dekodirati ga pomoću jwt-decode i izvući uloge (ROLE_ADMIN/ROLE_USER)
            //    - Postaviti 'user' stanje globalno u aplikaciji
            login(token);

            // 4. Pošto useEffect iznad prati promenu 'user' stanja,
            //    on će automatski odraditi preusmeravanje (redirect) na pravu stranicu!

        } catch (err) {
            // Ako backend baci 401 Unauthorized ili pukne veza
            if (err.response && err.response.status === 401) {
                setError('NEISPRAVNO KORISNIČKO IME ILI LOZINKA.');
            } else {
                setError('Greška pri povezivanju sa serverom.');
            }
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Log in</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Korisničko ime</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Unesite korisničko ime"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn">Prijavi se</button>
                </form>
            </div>
        </div>
    );
}

export default Login;