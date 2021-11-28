import React from 'react'
import './SlideShow.css'
import mobile from '../../images/mobile.jpg'
import laptop from '../../images/laptop.jpg'
import headphone from '../../images/headphone.jpg'
import speaker from '../../images/speaker.jfif'

const SlideShow = () => {

    return (
        <section className="slideshoww" style={{ zIndex: "1" }}>
            <div className="slider">
                <div className="slides">
                    <input type="radio" name="radio-btn" id="radio1" />
                    <input type="radio" name="radio-btn" id="radio2" />
                    <input type="radio" name="radio-btn" id="radio3" />
                    <input type="radio" name="radio-btn" id="radio4" />
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
                    <div className="navigation-auto">
                        <div className="auto-btn1"></div>
                        <div className="auto-btn2"></div>
                        <div className="auto-btn3"></div>
                        <div className="auto-btn4"></div>
                    </div>
                </div>
                <div className="navigation-manual">
                    <label htmlFor="radio1" className="manual-btn"></label>
                    <label htmlFor="radio2" className="manual-btn"></label>
                    <label htmlFor="radio3" className="manual-btn"></label>
                    <label htmlFor="radio4" className="manual-btn"></label>
                </div>
            </div>
        </section>
    )
}

export default SlideShow