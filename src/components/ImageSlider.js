import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './styles/ImageSlider.css';


const fadeImages = [
    'https://assets.ldscdn.org/53/cc/53cce20a6e319bd08e4ae99ecd5d97a35f093f13/illustrations_scriptures_book_of_mormon_christ.jpeg',
    'https://assets.ldscdn.org/ec/c8/ecc883f012e334ddee8500ff62cd60dd0c117ce2/scripture_study.jpeg',
    'https://assets.ldscdn.org/63/c6/63c682f7f5665ad84b96f8d72d1f7d42cc3912cc/priesthood_restoration_site.jpeg',
    'https://assets.ldscdn.org/7a/94/7a94265d6cd264296714cb69c65d5180d74346511120357/christ_ordains_twelve.jpeg'
];


export default class ImageSlider extends React.Component {

    render() {
        return(
            
            <div className="slide-container">
                <div className="triangle-overlay"/>
                <Fade
                    duration={1000}
                    arrows={false /* maybe add arrows in the future? */}
                >
                    <div className="slide-show">
                        <img className="slide-img" src={fadeImages[0]} alt="Book of Mormon Painting" />                
                    </div>

                    <div className="slide-show">
                        <img className="slide-img" src={fadeImages[1]} alt="Scripture Study"/>
                    </div>

                    <div className="slide-show">
                        <img className="slide-img" src={fadeImages[2]} alt="Book of Mormon Script"/>
                    </div>
                    
                    <div className="slide-show">
                        <img className="slide-img" src={fadeImages[3]} alt="Christ ordaining His Apostles"/>
                    </div>
                </Fade>
            </div>
        )
    }
}