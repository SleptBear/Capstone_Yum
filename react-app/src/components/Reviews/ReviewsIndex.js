import ReviewsIndexCard from "./ReviewsIndexCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { readAllReviews } from "../../store/review"

const ReviewsIndex = () => {
    const dispatch = useDispatch()
    const allReviewsState = useSelector(state => state.review)
    const reviewsSlice = allReviewsState?.AllReviews
    const reviewsArray = Object.values(reviewsSlice)
    const latestArray = reviewsArray.reverse().slice(0,6)

    useEffect(() => {
        dispatch(readAllReviews())
    }, [dispatch])
    // console.log(allReviewsState)
    console.log(latestArray)
    if(!reviewsArray[0]) return null
    return (

        <div className="review-container">
            {/* {latestArray.map(review => ( */}
        <div className="splash-Reviews">
                <ReviewsIndexCard review={latestArray[0]} key={latestArray[0]?.id}/>
                <ReviewsIndexCard review={latestArray[1]} key={latestArray[1]?.id}/>
                <ReviewsIndexCard review={latestArray[2]} key={latestArray[2]?.id}/>
                <ReviewsIndexCard review={latestArray[3]} key={latestArray[3]?.id}/>
                <ReviewsIndexCard review={latestArray[4]} key={latestArray[4]?.id}/>
                <ReviewsIndexCard review={latestArray[5]} key={latestArray[5]?.id}/>
        </div>
                {/* // ))} */}

        </div>
    )
}


export default ReviewsIndex
