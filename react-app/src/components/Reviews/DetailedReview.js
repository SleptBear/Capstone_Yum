// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import Reviewer from "./Reviewer"
import Stars from "./Stars"
import './reviews.css'
// import { useParams } from "react-router-dom"
// import DynamicStars from "./DynamicStars"


function DetailedReview(review) {
    // const dispatch = useDispatch()
    // const id = useParams()
    // console.log("ID------", id)
    const rev = review?.review
    // console.log("detailed Review", rev)


    // console.log(id.id == String)
    // let ulIdName = 'rev-mutate' + (!id?.id == String ? "" : " hidden");

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
            <div id="rev-mutate">
                <button>
                <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button>
                <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>

            <hr style={{width: '100%'}}></hr>
            {/* Description: {rev.review} */}
        </div>
    )
}


export default DetailedReview
