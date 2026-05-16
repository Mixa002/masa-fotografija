import react,{useRef} from 'react';
import slika1 from "../assets/zemun.jpeg";
import slika2 from "../assets/ada1.jpeg";
import slika3 from "../assets/ada2.jpeg";
import slika4 from "../assets/ada3.jpeg";
import slika5 from "../assets/natasa.jpeg"
import  "../styles/Featured.css"

const Featured = () =>{
    const scrollRef = useRef(null); // Kreiramo referencu

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            // Pomeramo za širinu jednog prozora
            const scrollAmount = current.offsetWidth;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const slides = [
        {id: 1, url: slika1, title: "Zemun"},
        {id: 2, url: slika2, title: "Ada"},
        {id: 3, url: slika3, title: "Ada"},
        {id: 4, url: slika4, title: "Ada"},
        {id: 6, url: slika5, title: "Natasa"},
        {id: 7, url: slika1, title: "Zemun"},
        {id: 8, url: slika2, title: "Ada"},
        {id: 9, url: slika3, title: "Ada"},
        {id: 10, url: slika4, title: "Ada"},
        {id: 11, url: slika5, title: "Natasa"},
        {id: 12, url: slika1, title: "Zemun"},
        {id: 13, url: slika2, title: "Ada"},
        {id: 14, url: slika3, title: "Ada"},
        {id: 15, url: slika4, title: "Ada"},
        {id: 16, url: slika5, title: "Natasa"},
        {id: 17, url: slika1, title: "Zemun"},
        {id: 18, url: slika2, title: "Ada"},
        {id: 19, url: slika3, title: "Ada"},
        {id: 20, url: slika4, title: "Ada"},
        {id: 21, url: slika5, title: "Natasa"},
    ];
    return(
        <section className="section-featured">
            <div className="section-header">
                <h2 className="section-title">ISTRAZI JOS FOTOGRAFIJA</h2>
            </div>
            <div className="carousel-container">
                {/* Dugmići za navigaciju */}
                <button className="nav-btn left-btn" onClick={() => scroll('left')}>‹</button>
                <button className="nav-btn right-btn" onClick={() => scroll('right')}>›</button>

                {/* Dodali smo ref={scrollRef} ovde */}
                <div className="carousel-wrapper" ref={scrollRef}>
                    {slides.map((slide) => (
                        <div key={slide.id} className="slide-item">
                            <div className="image-container">
                                <img src={slide.url} alt={slide.title} className="slide-img" />
                                <div className="slide-overlay">
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Featured;