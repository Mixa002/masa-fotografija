import ada1 from "../assets/ada1.jpeg"
import ada2 from "../assets/ada2.jpeg"
import ada3 from "../assets/ada3.jpeg"
import hero from "../assets/hero.jpeg"
import natasa from "../assets/natasa.jpeg"
import zemun from "../assets/zemun.jpeg"


export const MOCK_ALBUMS = [
    {
        id: 1,
        title: "Ada Ciganlija 1. Maj",
        category: "Nature",
        coverImage: ada1,
        isPublic: true,
        date: "2026-05-01",
        images: [ada1,ada2,ada3,natasa,hero,zemun]
    },
    {
        id: 2,
        title: "Kalemegdan",
        category: "Nature",
        coverImage: zemun,
        isPublic: false,
        date: "2026-05-01",
        images: [ada1,ada2,ada3,natasa,hero,zemun]    },
    {
        id: 3,
        title: "Zemun",
        category: "Nature",
        coverImage: zemun,
        isPublic: true,
        date: "2026-05-01",
        images: [ada1,ada2,ada3,natasa,hero,zemun]    },
    {
        id: 4,
        title: "Nis",
        category: "Nature",
        coverImage: ada2,
        isPublic: true,
        date: "2026-05-01",
        images: [ada1,ada2,ada3,natasa,hero,zemun]    }
];

export const MOCK_USERS = [
    { email: 'masa@gmail.com', password: 'masa123', role: 'ADMIN' },
    { email: 'klijent@gmail.com', password: 'user123', role: 'USER', allowedAlbums: [1, 3] }
]