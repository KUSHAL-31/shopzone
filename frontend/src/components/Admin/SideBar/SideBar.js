import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { PostAdd, Add, ListAlt, Dashboard, People, RateReview } from '@material-ui/icons'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">
                <p>
                    <Dashboard /> Dashboard
                </p>
            </Link>
            <Link to="/admin/products">
                <p>
                    <PostAdd />
                    View Products
                </p>
            </Link>

            <Link to="/admin/product">
                <p>
                    <Add />
                    Create Product
                </p>
            </Link>

            <Link to="/admin/orders">
                <p>
                    <ListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <People /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReview />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;