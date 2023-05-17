
import Reviewer from "./Reviewer"
import Stars from "./Stars"
import './reviews.css'
import { useDispatch } from "react-redux"



function DetailedReviewsLocation(review) {
    const dispatch = useDispatch()
    const rev = review?.review

    return (
        <div className="rev-card">
            <div id="reviewer">
                <Reviewer review={rev}/>
            </div>
            <div id="rating">
                <Stars rating={review.review.rating}/>
            {rev.updated_at.slice(0, 17)}
            </div>
            <p>
                {rev.review}
            </p>
            <hr style={{width: '100%'}}></hr>
        </div>
    )
}


export default DetailedReviewsLocation
