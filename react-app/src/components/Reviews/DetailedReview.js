// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import Stars from "./Stars"


function DetailedReview(review) {
    // const dispatch = useDispatch()
    const rev = review?.review

    return (
        <div>
            <Stars rating={review.review.rating}/>
            Rating: {rev.rating}
        </div>
    )
}


export default DetailedReview
