import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './SlideShow.css'
import mobile from '../../images/mobile.jpg'
import laptop from '../../images/laptop.jpg'
import headphone from '../../images/headphone.jpg'
import speaker from '../../images/speaker.jfif'

const SlideShow = () => {

    return (
        <Carousel>
            <div className="slide first">
                <div className="text-part">
                    <h1>Gaming laptops</h1>
                    <p>Get best discount today upto 40% off</p>
                </div>
                <img src={laptop} alt="" />
            </div>
            <div className="slide">
                <div className="text-part">
                    <h1>Bluetooth speakers</h1>
                    <p>Flat 300 off on purchase of speakers</p>
                </div>
                <img src={speaker} alt="" />
            </div>
            <div className="slide">
                <div className="text-part">
                    <h1>Smart phones</h1>
                    <p>Now available on no cost EMI</p>
                </div>
                <img src={mobile} alt="" />
            </div>
            <div className="slide">
                <div className="text-part">
                    <h1>Headphones</h1>
                    <p>Free delivery on headsets this weekend</p>
                </div>
                <img src={headphone} alt="" />
            </div>
        </Carousel>

    )
}

export default SlideShow