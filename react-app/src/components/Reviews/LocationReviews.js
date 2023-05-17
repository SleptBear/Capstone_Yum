import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { readReviews } from "../../store/review"
import DetailedReviewsLocation from "./DetailedReviewsLocation"


function LocationReviews({location}) {
    const dispatch = useDispatch()
    const reviewsObj = useSelector(state => state.review.LocationReviews)
    const id = useParams();
    const reviewsArray = Object.values(reviewsObj)
    // console.log("location reviews prop", location)

    const sortByDate = (arr) => {
        const sorter = (a, b) => {
            return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
        }
        arr.sort(sorter);
    };
    sortByDate(reviewsArray);

    useEffect(() => {
        dispatch(readReviews(id?.id))
    }, [dispatch])

    if (!location.reviews[0]) return null
    reviewsArray.reverse()
    // console.log(reviewsArray)
    return (
        <div className="review-container">
        <h2>Recommended Reviews</h2>
        <div>
            {reviewsArray.map(review => (
                <DetailedReviewsLocation review={review} key={review.id}/>
                ))}

        </div>
        </div>
    )
}


export default LocationReviews
