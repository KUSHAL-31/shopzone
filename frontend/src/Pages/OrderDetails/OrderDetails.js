import React, { useEffect } from 'react'
import './OrderDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'
import { useAlert } from 'react-alert'
import MetaData from '../MetaData'


const OrderDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { order, loading, error } = useSelector(state => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(match.params.id))
    }, [dispatch, alert, error, match.params.id])

    return (
        <>
            {
                loading ? <><div className="loading">
                    <div></div>
                </div></> : <>
                    <MetaData title="ShopZone | Order Details" />
                    <div className="order_detail_page">
                        <div className="order_detail_container">
                            <Typography component="h1">Order #{order && order._id}</Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="orderDetails_container_box">
                                <div>
                                    <p>Name :</p>
                                    <span>{order.user && order.user.username}</span>
                                </div>
                                <div>
                                    <p>Phone No :</p>
                                    <span>{order.shipInfo && order.shipInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address :</p>
                                    <span>{order.shipInfo && `${order.shipInfo.address}, ${order.shipInfo.city}, ${order.shipInfo.state}, ${order.shipInfo.pinCode}, ${order.shipInfo.country}`}</span>
                                </div>
                            </div>
                            <Typography>Payment</Typography>
                            <div className="orderDetails_container_box">
                                <div>
                                    <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ?
                                        "stockGreenColor" : "stockRedColor"
                                    }
                                    >{order.paymentInfo && order.paymentInfo.status === "succeeded" ?
                                        "PAID" : "NOT PAID"
                                        }</p>
                                </div>
                                <div>
                                    <p>Amount :</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>
                            <Typography>Order Status:</Typography>
                            <div className="orderDetails_container_box">
                                <div>
                                    <p className={order.orderStatus && order.orderStatus === "succeeded" ?
                                        "stockGreenColor" : "stockRedColor"
                                    }
                                    >{order.orderStatus && order.orderStatus}</p>
                                </div>
                            </div>
                        </div>
                        <div className="orderDetails_cartItems">
                            <Typography>Order Items : </Typography>
                            <div className="orderDetails_cartItems_container">
                                {
                                    order.orderItems && order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                            <span>
                                                {item.quantity} X ₹{item.price} =
                                                <b> ₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default OrderDetails
