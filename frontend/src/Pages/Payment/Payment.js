import React, { useRef, useEffect } from 'react'
import './Payment.css'
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { CreditCard, Event, VpnKey } from '@material-ui/icons'
import { clearErrors, createOrder } from '../../actions/orderActions'

const Payment = ({ history }) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { error } = useSelector(state => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shipInfo: shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shipPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);

            const client_secret = data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.username,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    history.push("/success");
                } else {
                    alert.error("Payment processing issue")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, history, error])

    return (
        <>
            <MetaData title="ShopZone | Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="payment_container">
                <form className="payment_form" onSubmit={(e) => handleSubmit(e)}>
                    <Typography>Card Information</Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className="payment_input" />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className="payment_input" />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className="payment_input" />
                    </div>
                    <input type="submit"
                        value={`Pay  ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="payment_button" />
                </form>
            </div>
        </>
    )
}

export default Payment
