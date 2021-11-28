import React, { useEffect, useState } from 'react'
import './ProcessOrder.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MetaData from '../../../Pages/MetaData'
import Sidebar from '../SideBar/SideBar'
import { getOrderDetails, clearErrors, updateOrder } from '../../../actions/orderActions'
import { AccountTree } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstant'


const ProcessOrder = ({ history, match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [status, setStatus] = useState("")

    const { order, loading, error } = useSelector(state => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.order);

    const updateOrderStatus = (e) => {

        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(match.params.id, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order updated successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getOrderDetails(match.params.id))
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError])


    return (
        <>
            <MetaData title="ShopZone | Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="new_product_container">
                    {
                        loading ? <div className="loading"><div></div></div> :
                            <div className="confirm_order_page"
                                style={{
                                    display: order.orderStatus === "Delivered" ? "block" : "grid",
                                }}
                            >
                                <div>
                                    <div className="confirm_shipping_address">
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
                                                <span>{order && order.shipInfo && `${order.shipInfo.address}, ${order.shipInfo.city}, ${order.shipInfo.state}, ${order.shipInfo.pinCode}, ${order.shipInfo.country}`}</span>
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
                                                <p className={order.orderStatus && order.orderStatus === "Delivered" ?
                                                    "stockGreenColor" : "stockRedColor"
                                                }
                                                >{order.orderStatus && order.orderStatus}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="confirm_cart_items">
                                        <Typography>Your Cart Items : </Typography>
                                        <div className="confirm_cart_items_container">
                                            {order.orderItems &&
                                                order.orderItems.map((item) => (
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
                                <div
                                    style={{
                                        display: order.orderStatus === "Delivered" ? "none" : "block",
                                    }}
                                >
                                    <form
                                        className="updateOrderStatusForm"
                                        onSubmit={updateOrderStatus}
                                    >
                                        <h1>Process Order </h1>

                                        <div>
                                            <AccountTree />
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Choose Category</option>
                                                {order.orderStatus === "Processing" && (<option value="Shipped">Shipped</option>)}
                                                {order.orderStatus === "Shipped" && (<option value="Delivered">Delivered</option>)}
                                            </select>
                                        </div>

                                        <Button
                                            id="createProductBtn"
                                            type="submit"
                                            disabled={loading ? true : false || status === "" ? true : false}
                                        >
                                            Process
                                        </Button>
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProcessOrder