import React, {createContext, useState, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            try{
                const decoded = jwtDecode(token);
                if(decoded.exp * 1000 > Date.now()){
                    setUser({
                        username:decoded.sub,
                        roles:decoded.roles || []
                    });
                }else{
                    localStorage.removeItem('token');
                }
            }
            catch (error){
                console.error("Greska pri citanju tokena: " + token);
            }
        }
        setLoading(false);
    }, []);


    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser({
            username:decoded.sub,
            roles: decoded.roles || []
        });
    }

    // Funkcija za Logout
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Pomoćne funkcije koje možeš koristiti bilo gde na frontendu
    const isAdmin = () => user?.roles.includes('ROLE_ADMIN');
    const isUser = () => user?.roles.includes('ROLE_USER');

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin, isUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};