// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import Stars from "./Stars"
import DynamicStars from "./DynamicStars"


function DetailedReview(review) {
    // const dispatch = useDispatch()
    const rev = review?.review

    return (
        <div>
            <DynamicStars rating={review.review.rating}/>
            <Stars rating={review.review.rating}/>
            Rating: {rev.rating}
        </div>
    )
}


export default DetailedReview
