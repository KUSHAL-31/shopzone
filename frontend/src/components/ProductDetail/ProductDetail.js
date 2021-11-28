import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProductDetail, newReview } from '../../actions/productAction';
import './ProductDetail.css'
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../ReviewCard/ReviewCard';
import { useAlert } from "react-alert"
import MetaData from "react-helmet";
import { addToCart } from '../../actions/cartAction';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstant';

const ProductDetail = ({ match }) => {

    const { product, loading, error } = useSelector((state) => state.productDetail)
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            return;
        }
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(quantity - 1);
    }

    const handleAddToCart = () => {
        dispatch(addToCart(match.params.id, quantity));
        alert.success("Item added to cart successfully");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const submitReview = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);
        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review submitted successfully");
            dispatch({ type: NEW_REVIEW_RESET })
        }
        dispatch(getProductDetail(match.params.id))
    }, [dispatch, match.params.id, alert, error, success, reviewError])


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true,
    }

    return (
        <>
            {loading ? <> <div className="loading">
                <div></div></div>
            </> : <>
                <MetaData title={`ShopZone | ${product.name}`}></MetaData>
                <div className="productDetail">
                    <div>
                        <Carousel>
                            {
                                product.images && product.images.map((item, i) => (
                                    <img key={item.url} className="CarouselImage" src={item.url} alt={`${i} Slide`} />
                                ))
                            }
                        </Carousel>
                    </div>
                    <div>
                        <div className="productDetailBox1">
                            <h2>{product.name}</h2>
                            <p>{product._id}</p>
                        </div>
                        <div className="productDetailBox2">
                            <ReactStars {...options} />
                            <span> ({product.reviewCount} reviews)</span>
                        </div>
                        <div className="productDetailBox3">
                            <h1>₹{product.price}</h1>
                            <div className="productDetailBox3-1">
                                <div className="productDetailBox3-1-1">
                                    <button onClick={() => decreaseQuantity()}>-</button>
                                    <input readOnly type="number" value={quantity} disabled={true} />
                                    <button onClick={() => increaseQuantity()}>+</button>
                                </div>
                                <button disabled={product.stock < 1 ? true : false} onClick={() => handleAddToCart()}>Add to Cart</button>
                            </div>
                            <p>Status:
                                <b className={product.stock < 1 ? "stockRedColor" : "stockGreenColor"}>
                                    {product.stock < 1 ? " Out of Stock" : " In Stock"}
                                </b>
                            </p>
                        </div>
                        <div className="productDetailBox4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
                    </div>
                </div>
                <h3 className="productReviewheading">Reviews</h3>

                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submit_dialog">
                        <Rating
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            size="large"
                        />
                        <textarea
                            className="submitDialog_text"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        >

                        </textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                        <Button color="primary" onClick={submitReview}>Submit</Button>
                    </DialogActions>
                </Dialog>

                {
                    product.reviews && product.reviews[0] ? (
                        <div className="reviewSection">
                            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} key={review._id} />)}
                        </div>
                    ) : (
                        <p className="noReviews">No reviews yet</p>
                    )
                }
            </>
            }
        </>
    )
}

export default ProductDetail
