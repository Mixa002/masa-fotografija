import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import '../../styles/Login.css';
import {MOCK_USERS} from "../../data/MockData.js"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userRole = localStorage.getItem('userRole');

        if (isLoggedIn) {
            // Ako je već ulogovan, ne daj mu da vidi formu nego ga preusmeri
            if (userRole === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [navigate]);

    const handleLogin = (e) =>{
        e.preventDefault();
        setError('');
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if(user){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userEmail', user.email);
            if (user.allowedAlbums) {
                localStorage.setItem('allowedAlbums', JSON.stringify(user.allowedAlbums));
            }
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard'); // Ovo ćeš praviti kasnije
            } else {
                navigate('/'); // Klijenta šaljemo na njegove albume
            }
            window.location.reload();
        }else{
            setError('NEISPRAVAN EMAIL ILI LOZINKA.');
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="primer@mail.com"
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