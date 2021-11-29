import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { PostAdd, Add, ListAlt, Dashboard, People, RateReview } from '@material-ui/icons'

const Sidebar = () => {

    const conditionalScrollHandler = () => {
        if (window.innerWidth <= 600) {
            window.scrollTo(0, 650)
        }
    }

    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">
                <p onClick={conditionalScrollHandler}>
                    <Dashboard /> Dashboard
                </p>
            </Link>
            <Link to="/admin/products">
                <p onClick={conditionalScrollHandler}>
                    <PostAdd />
                    View Products
                </p>
            </Link>

            <Link to="/admin/product">
                <p onClick={conditionalScrollHandler}>
                    <Add />
                    Create Product
                </p>
            </Link>

            <Link to="/admin/orders">
                <p onClick={conditionalScrollHandler}>
                    <ListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p onClick={conditionalScrollHandler}>
                    <People /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p onClick={conditionalScrollHandler}>
                    <RateReview />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;