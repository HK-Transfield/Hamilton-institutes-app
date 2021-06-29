import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles/ImageSlider.css';

/**
 * Displays an infinitely rotating image slider, showcasing various
 * different images that describe what Institute is like, as well
 * as any announcements.
 * 
 * @returns The DOM for the image slider
 * @author Harmon Transfield
 */
const ImageSlider = () => {

    // any images you want to display requires the source and alternative text
    const imgArray = [
        {
            "src": "https://assets.ldscdn.org/53/cc/53cce20a6e319bd08e4ae99ecd5d97a35f093f13/illustrations_scriptures_book_of_mormon_christ.jpeg",
            "alt": "Book of Mormon painting"
        },
        {
            "src": "https://assets.ldscdn.org/ec/c8/ecc883f012e334ddee8500ff62cd60dd0c117ce2/scripture_study.jpeg",
            "alt": "Scripture study",
        },
        {
            "src": "https://assets.ldscdn.org/63/c6/63c682f7f5665ad84b96f8d72d1f7d42cc3912cc/priesthood_restoration_site.jpeg",
            "alt": "Book of Mormon manuscript",
        },
        {
            "src": "https://assets.ldscdn.org/7a/94/7a94265d6cd264296714cb69c65d5180d74346511120357/christ_ordains_twelve.jpeg",
            "alt": "Christ ordaining the Twelve Apostles",
        }
    ];

    // generate the JSX for every image that will be displayed in the landing page
    const slideShowJsx = imgArray.map((img, i) => {
        return(
            <div className="slide-show">
                <img className="slide-img" key={"slideshow-" + img.alt} src={img.src} alt={img.alt} />                
            </div>
        );
    });

    return(   
        <div className="slide-container">
            <div className="triangle-overlay"/>
            <Fade
                duration={1500}
                arrows={false /* maybe add arrows in the future? */}
            >
                {slideShowJsx}
            </Fade>
        </div>
    );
}

export default ImageSlider;