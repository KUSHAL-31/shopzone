import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';


const ProductCard = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: 25,
        value: product.ratings,
        isHalf: true,
    }

    return (
        <Link className="product_card" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="" />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span>({product.reviewCount} reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard
