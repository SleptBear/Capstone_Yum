import SplashReviewer from "./SplashReviewer"
import Stars from "./Stars"
import './reviews.css'
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { useEffect } from "react";
import { readAllReviews } from "../../store/review";


function ReviewsIndexCard(review) {
    const dispatch = useDispatch()
    // const allReviewsState = useSelector(state => state.review)
    // const reviewsSlice = allReviewsState?.AllReviews
    // const reviewsArray = Object.values(reviewsSlice)
    const rev = review?.review

    // useEffect(() => {
    //     dispatch(readAllReviews())
    // }, [dispatch])

    // console.log(review)

    return (
        

        <div className="all-rev-card">
            <NavLink exact to={`/locations/${review.review.location.id}`} id="name-on-rating" style={{color: 'black'}}>

            <div id="all-reviewer">
                <SplashReviewer review={rev}/>
            </div>
            <img src={review.review.location.images[0]?.img_url}></img>
            <div id="rating-name">
                {review.review.location.name}
            </div>
            <div id="rating">
                <Stars rating={review.review.rating}/>
            {/* {rev.updated_at.slice(0, 17)} */}
            </div>
            <p>
                {rev.review}
            </p>
            </NavLink>
        </div>


    )
}


export default ReviewsIndexCard
