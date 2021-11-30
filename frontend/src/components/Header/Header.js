import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import "./Header.css";

function Header() {

    const history = useHistory();
    const { loading, authUser } = useSelector(state => state.user);
    const { cartItems } = useSelector(state => state.cart);

    const handleNavClick = () => {
        const checkbox = document.getElementById("click");
        checkbox.checked = false;
    }

    return (
        <>
            <nav>
                <div className="logo" onClick={() => history.push("/")}>ShopZone</div>
                <input type="checkbox" id="click" />
                <label htmlFor="click" className="menu-btn closeMenuHandle">
                    <i className="fas fa-bars"></i>
                </label>
                <ul>
                    <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
                    <li><Link to="/products" onClick={handleNavClick}>Products</Link></li>
                    <li><Link to="/about" onClick={handleNavClick}>About</Link></li>
                    <li><Link to="/cart" onClick={handleNavClick}>{cartItems.length !== 0 ? `Cart(${cartItems.length})` : `Cart`}</Link></li>
                    {loading ? "" : authUser ? <li><Link to="/login" style={{ display: "none" }}>Login</Link></li> : <li><Link to="/login" onClick={handleNavClick}>Login</Link></li>}
                </ul>
            </nav>
        </>
    )
}

export default Header;
