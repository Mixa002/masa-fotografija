import React, {useContext} from 'react'
import Navbar from "./components/Navbar.jsx"
import HeroPhotoSection from "./components/HeroPhotoSection.jsx"
import Featured from "./components/Featured.jsx"
import LandingPage from "./pages/client/LandingPage.jsx"
import {Routes, Route, Navigate} from 'react-router-dom'
import RecentWorks from "./pages/client/RecentWorks.jsx"
import AlbumDetails from "./pages/client/AlbumDetails.jsx"
import Login from "./pages/client/Login.jsx"
import YourAlbums from "./pages/client/YourAlbums.jsx"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import {AuthContext} from "./context/AuthContext.jsx"

function App() {

    const {user, isAdmin} = useContext(AuthContext);
    if(user && isAdmin()){
        return (
            <Routes>
                <Route path = "/admin/dashboard" element = {<AdminDashboard/>}/>
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
        );
    }
    return(
        <>
            {/* Navbar vide samo gosti i obični korisnici */}
            <Navbar />
            <Routes>
                {/* Home stranica (Landing Page) */}
                <Route path="/" element={<LandingPage />} />

                {/* Stranica sa svim javnim albumima */}
                <Route path="/recent-works" element={<RecentWorks />} />

                {/* Login stranica */}
                <Route path="/login" element={<Login />} />

                {/* Detalji pojedinačnog albuma */}
                <Route path="/album/:id" element={<AlbumDetails />} />

                {/* Stranica za ulogovane klijente (Varijanta B) */}
                {/* Prikazuje se samo ako je korisnik ulogovan (i pošto je prošao if iznad, znamo da je ROLE_USER) */}
                <Route
                    path="/your-albums"
                    element={user ? <YourAlbums /> : <Navigate to="/login" replace />}
                />

                {/* Ako gost/klijent pokuša ručno da ukuca admin rutu, vraćamo ga na login */}
                <Route path="/admin/dashboard" element={<Navigate to="/login" replace />} />

                {/* Za bilo koju nepostojeću rutu, vraćamo na početnu */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    )
}

export default App