// import { useEffect } from "react"
// import { useDispatch } from "react-redux"
import Reviewer from "./Reviewer"
import RevLocation from "./RevLocation"
import Stars from "./Stars"
import './reviews.css'
import { useDispatch } from "react-redux"
import { deleteReview } from "../../store/review"
import { useParams, Link } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import RemoveReviewButton from "../Forms/RemoveReviewButton"
// import DynamicStars from "./DynamicStars"


function DetailedReview(review) {
    const dispatch = useDispatch()
    // const id = useParams()
    // console.log("ID------", id)
    const rev = review?.review
    // console.log("detailed Review", rev)


    // console.log(id.id == String)
    // let ulIdName = 'rev-mutate' + (!id?.id == String ? "" : " hidden");

    const handleDelete = async (e) => {
        dispatch(deleteReview(rev.id))
        return null
    }


    return (
        <div className="rev-card">
            <div id="reviewer">
                <RevLocation review={rev}/>
            </div>
            <div id="rating">
                <Stars rating={review.review.rating}/>
            {rev.updated_at.slice(0, 17)}
            </div>
            <div id="rev-and-mutate">

            <p>
                {rev.review}
            </p>
            <div id="rev-mutate">
                <Link to={`/reviews/${rev.id}/edit`}>
                <button>
                <i className="fa-regular fa-pen-to-square"></i>
                </button>
                </Link>
                {/* <button onClick={() => handleDelete()}>
                <i className="fa-regular fa-trash-can"></i>
                </button> */}
                <OpenModalButton
                modalComponent={<RemoveReviewButton rev={rev}/>}
                buttonText={<i className="fa-regular fa-trash-can"></i>}
                // style={{backgroundColor: 'dark red'}}
                >
                </OpenModalButton>
            </div>
            </div>

            <hr style={{width: '100%'}}></hr>
            {/* Description: {rev.review} */}
        </div>
    )
}


export default DetailedReview
