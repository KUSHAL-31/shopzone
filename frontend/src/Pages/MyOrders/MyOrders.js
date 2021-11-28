import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Typography } from '@material-ui/core'
import MetaData from '../MetaData'
import { Launch } from '@material-ui/icons'
import './MyOrders.css'

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector(state => state.myOrders);
    const { user } = useSelector(state => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "stockGreenColor"
                    : "stockRedColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch />
                    </Link>
                );
            }
        }
    ];
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,

        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, alert, error,])

    return (
        <>
            <MetaData title="ShopZone | Your Orders" />
            {loading ? <>
                <div className="loading">
                    <div></div>
                </div>
            </> : <div className="myOrder_page">
                <DataGrid
                    disableSelectionOnClick
                    className="myOrders_table"
                    pageSize={10}
                    rows={rows}
                    columns={columns}
                    autoHeight
                />
                <Typography className="myOrders_heading">{user.username} 's Orders</Typography>
            </div>
            }
        </>
    )
}

export default MyOrders
