import React from 'react'
import './ConfirmOrder.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import MetaData from '../MetaData'

const ConfirmOrder = ({ history }) => {

    const { shippingInfo, cartItems } = useSelector(state => state.cart);

    const { user } = useSelector(state => state.user);

    const subtotal = cartItems.reduce((prev, item) =>
        prev + item.quantity * item.price, 0
    )

    const shippingCharges = subtotal > 5000 ? 200 : 0;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + shippingCharges + tax;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    }

    return (
        <>
            <MetaData title="ShopZone | Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirm_order_page">
                <div>
                    <div className="confirm_shipping_address">
                        <Typography>Shipping Info</Typography>
                        <div className="confirm_shipping_address_box">
                            <div>
                                <p>Name :</p>
                                <span>{user.username}</span>
                            </div>
                            <div>
                                <p>Phone No :</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address :</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirm_cart_items">
                        <Typography>Your Cart Items : </Typography>
                        <div className="confirm_cart_items_container">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <span>
                                            {item.quantity} X ₹{item.price} =
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="order_summary">
                        <Typography>Order Summary : </Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="order_summary_total">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder
