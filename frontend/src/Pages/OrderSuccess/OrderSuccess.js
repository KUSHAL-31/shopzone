import React from 'react'
import './OrderSuccess.css'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'

const OrderSuccess = () => {
    return (
        <div className="order_success">
            <CheckCircle />
            <Typography>Your order has been places successfully</Typography>
            <Typography className="thankyou_for_shopping">Thank You for Shopping !!</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    )
}

export default OrderSuccess
