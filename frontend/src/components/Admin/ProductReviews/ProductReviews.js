import React, { useEffect, useState } from 'react'
import './ProductReviews.css'
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, getAllReviews, deleteReviews } from '../../../actions/productAction'
import MetaData from '../../../Pages/MetaData'
import SideBar from '../SideBar/SideBar'
import { Button } from '@material-ui/core'
import { Delete, Star } from '@material-ui/icons'
import { DELETE_REVIEW_RESET } from '../../../constants/productConstant'

const ProductReviews = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error: deleteError, isDeleted } = useSelector(state => state.review);
    const { error, reviews, loading } = useSelector(state => state.productReviews);

    const [productId, setProductId] = useState("")

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    }

    const productReviewHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }

    useEffect(() => {

        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            history.push("/admin/reviews")
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, alert, deleteError, isDeleted, history, productId]);

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 260,
            flex: 0.7,
        },

        {
            field: "username",
            headerName: "Username",
            minWidth: 170,
            flex: 0.4,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 0.8,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "stockGreenColor"
                    : "stockRedColor";
            },
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
                        <Button onClick={() => handleDeleteReview(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </>
                )
            }
        },
    ];

    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            username: item.username,
        })
    });

    return (
        <>
            <MetaData title="ShopZone | All Reviews" />
            <div className="dashboard">
                <SideBar />
                <div className="product_review_container">

                    <form
                        className="product_review_form"
                        onSubmit={productReviewHandler}
                    >
                        <h1 className="product_review_form_heading">All Reviews</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product ID"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (<DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="product_list_table"
                        autoHeight
                    />) : (<h1 className="product_review_form_heading">No reviews found</h1>)
                    }

                </div>
            </div>
        </>
    )
}

export default ProductReviews
