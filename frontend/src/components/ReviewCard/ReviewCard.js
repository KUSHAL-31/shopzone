import React from 'react'
import './ReviewCard.css'
import ReactStars from 'react-rating-stars-component';
import profilePic from '../../images/profilePic.jpg'

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    }

    return (
        <>
            <div className="reviewCard">
                <img src={profilePic} alt="user" />
                <p>{review.username}</p>
                <ReactStars {...options} />
                <span>{review.comment}</span>
            </div>
        </>
    )
}

export default ReviewCard
