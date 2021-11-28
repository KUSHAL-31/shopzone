import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="footer" style={{ zIndex: "1" }}>
                <footer>
                    <div className="footer__content">
                        <h3 className="footer-title">ShopZone</h3>
                        <div className="social__icons">
                            <Link to="/" className="social__icon"><i className='bx bxl-facebook'></i></Link>
                            <Link to="/" className="social__icon"><i className='bx bxl-instagram'></i></Link>
                            <Link to="/" className="social__icon"><i className='bx bxl-linkedin'></i></Link>
                        </div>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer-title">Services</h3>
                        <ul>
                            <li><Link to="/" className="footer__link">Fast delivery</Link></li>
                            <li><Link to="/" className="footer__link">Affordable price</Link></li>
                            <li><Link to="/" className="footer__link">Premium quality</Link></li>

                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer-title">Information</h3>
                        <ul>
                            <li><Link to="/" className="footer__link">Contact us</Link></li>
                            <li><Link to="/" className="footer__link">Privacy policy</Link></li>
                            <li><Link to="/" className="footer__link">Terms of services</Link></li>
                        </ul>
                    </div>

                    <div className="footer__content">
                        <h3 className="footer-title">Address</h3>
                        <ul>
                            <li>Mumbai - India</li>
                            <li>shopzone@gmail.com</li>
                        </ul>
                    </div>
                </footer>
                <p className="copyright">ShopZone - &#169; 2021. All right reserved</p>
            </div>
        </>
    )
}

export default Footer
