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
            <div id="all-reviewer">
                <SplashReviewer review={rev}/>
            </div>
            <img src={review.review.location.images[0]?.img_url}></img>
            <NavLink exact to={`/locations/${review.review.location.id}`} id="name-on-rating">
            {/* <div id="name-on-rating"> */}
                {review.review.location.name}
            {/* </div> */}
            </NavLink>
            <div id="rating">
                <Stars rating={review.review.rating}/>
            {/* {rev.updated_at.slice(0, 17)} */}
            </div>
            <p>
                {rev.review}
            </p>
            {/* <hr style={{width: '100%'}}></hr> */}
        </div>
    )
}


export default ReviewsIndexCard
