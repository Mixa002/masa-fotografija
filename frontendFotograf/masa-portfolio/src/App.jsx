import Navbar from "./components/Navbar.jsx"
import HeroPhotoSection from "./components/HeroPhotoSection.jsx"
import Featured from "./components/Featured.jsx"
import LandingPage from "./pages/client/LandingPage.jsx"
import {Routes, Route} from 'react-router-dom'
import RecentWorks from "./pages/client/RecentWorks.jsx"
import AlbumDetails from "./pages/client/AlbumDetails.jsx"
import Login from "./pages/client/Login.jsx"
function App() {
    return(
        <>
            <Navbar/>
            <Routes>
                {/* Home stranica (Landing Page) */}
                <Route path="/" element={<LandingPage />} />

                {/* Stranica sa svim javnim albumima */}
                <Route path="/recent-works" element={<RecentWorks />} />

                {/* Ovde ćeš dodati ostale rute kako ih budeš pravio */}
                {/* <Route path="/your-albums" element={<YourAlbums />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/album/:id" element={<AlbumDetails />} />
            </Routes>
        </>
    )
}

export default App