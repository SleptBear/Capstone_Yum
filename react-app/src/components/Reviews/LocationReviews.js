import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { readReviews } from "../../store/review"
import DetailedReview from "./DetailedReview"


function LocationReviews() {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.LocationReviews)
    const id = useParams();
    const reviewsArray = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(readReviews(id?.id))
    }, [dispatch, id.id])

    // console.log("reviews Array", reviewsArray)
    if (!reviewsArray[0]) return null
    return (
        <>
        <h2>Recommended Reviews</h2>
        <div>
            {reviewsArray.map(review => (
                <DetailedReview review={review} key={review.id}/>
                ))}
        </div>
        </>
    )
}


export default LocationReviews
