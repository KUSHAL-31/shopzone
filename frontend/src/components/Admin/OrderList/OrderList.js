import React, { useEffect } from 'react'
import './OrderList.css'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { deleteOrder, getAllOrders, clearErrors } from '../../../actions/orderActions'
import MetaData from '../../../Pages/MetaData'
import SideBar from '../SideBar/SideBar'
import { Button } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { DELETE_ORDER_RESET } from '../../../constants/orderConstant'

const OrderList = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, orders } = useSelector(state => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(state => state.order);

    const handleDeleteOrder = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order deleted successfully");
            history.push("/admin/orders")
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, error, alert, deleteError, isDeleted, history]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 280, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 170,
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
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 220,
            flex: 0.4,
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
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => handleDeleteOrder(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </>
                )
            }
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        })
    });

    return (
        <>
            <MetaData title="ShopZone | All Orders" />
            <div className="dashboard">
                <SideBar />
                <div className="product_list_container">
                    <h1 id="product_list_heading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="product_list_table"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default OrderList
