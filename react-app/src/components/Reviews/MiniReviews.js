import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { readReviews } from "../../store/review"
import DetailedReview from "./DetailedReview"


function MiniReviews() {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.LocationReviews)
    const id = useParams();
    const reviewsArray = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(readReviews(id?.id))
    }, [dispatch, id.id])

    if (!reviewsArray[0]) return null
    console.log(reviewsArray)
    return (
        <div>
            {reviewsArray.map(review => (
                <DetailedReview review={review} key={review.id}/>
            ))}
        </div>
    )
}


export default MiniReviews
