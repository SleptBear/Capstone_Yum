// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import Stars from "./Stars"
// import DynamicStars from "./DynamicStars"


function DetailedReview(review) {
    // const dispatch = useDispatch()
    const rev = review?.review
    // console.log("detailed Review", rev)

    return (
        <div>
            {/* <DynamicStars rating={review.review.rating}/> */}
            <Stars rating={review.review.rating}/>
            {/* User: {rev.reviewer.first_name} {rev.reviewer.last_name} */}
            Rating: {rev.rating}
            {/* Description: {rev.review} */}
        </div>
    )
}


export default DetailedReview
