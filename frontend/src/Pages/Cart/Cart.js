import React from 'react'
import './Cart.css'
import '../../components/CartItemCard/CartItemCard'
import CartItemCard from '../../components/CartItemCard/CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartAction'
import { RemoveShoppingCart } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MetaData from '../MetaData'

const Cart = ({ history }) => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const increaseQuanity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (newQuantity >= stock) {
            return;
        }
        dispatch(addToCart(id, newQuantity));
    }

    const decreaseQuanity = (id, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            return;
        }
        dispatch(addToCart(id, newQuantity));
    }

    const deletecartItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const handleCheckout = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <>
            <MetaData title="ShopZone | Cart" />
            {cartItems.length === 0 ? (<div className="empty_cart">
                <RemoveShoppingCart />
                <Typography>No products in you Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>) :
                <>
                    (<div className="cart_page">
                        <div className="cart_header">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {
                            cartItems && cartItems.map((item) => (
                                <div className="cart_container" key={item.product}>
                                    <CartItemCard item={item} removeFromCart={deletecartItem} />
                                    <div className="cart_input">
                                        <button onClick={() => decreaseQuanity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuanity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cart_subtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))
                        }

                        <div className="cart_gross_total">
                            <div>

                            </div>
                            <div className="cart_gross_total_box">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce((prev, item) => prev + item.quantity * item.price, 0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkout_button">
                                <button onClick={handleCheckout}>Check Out</button>
                            </div>
                        </div>
                    </div>)
                </>
            }
        </>
    )
}

export default Cart
