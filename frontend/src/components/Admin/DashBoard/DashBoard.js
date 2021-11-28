import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import SideBar from '../SideBar/SideBar'
import './DashBoard.css'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsforAdmin } from '../../../actions/productAction'
import { getAllOrders } from '../../../actions/orderActions'
import { getAllUsers } from '../../../actions/userActions'

const DashBoard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;

        }
    })

    useEffect(() => {
        dispatch(getAllProductsforAdmin());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;

    orders && orders.forEach(item => {
        totalAmount += item.totalPrice;
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["red"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of stock", "In stock"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["#e8357f", "#1b5cd2"],
                hoverBackgroundColor: ["#651838", "#163263"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    }

    return (
        <div className="dashboard">
            <SideBar />
            <div className="dashboard_container">
                <Typography component="h1">Dashboard</Typography>
                <div className="dashboard_summary">
                    <div>
                        <p>
                            Total Amount <br />₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboard_summary_2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="linechart">
                    <Line data={lineState} />
                </div>

                <div className="donut_chart">
                    <Doughnut data={doughnutState} />
                </div>

            </div>
        </div>
    )
}

export default DashBoard
