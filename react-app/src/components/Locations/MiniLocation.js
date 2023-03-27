import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { readReviews } from "../../store/review"
import Stars from "../Reviews/Stars"


function MiniLocation(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session?.user)
    const [showEdit, setShowEdit] = useState(true)

    useEffect(() => {
        dispatch(readReviews(props?.location.id))
        if(props.location.owner_id == user?.id) setShowEdit(true)
        if(props.location.owner_id != user?.id) setShowEdit(false)
    }, [dispatch, user, showEdit])

    if(!props?.location.id) return null
    if(!props?.reviews[0]) return null


    const handleReviews = () => {
        let avg = 0
        let count = 0
        props.reviews.forEach(review => {
            avg += review?.rating
            count += 1
        });
        // console.log("BEFORE", averageRating)
        let averageRating = Number(avg/count)
        return <Stars rating={averageRating}/>
    }

    const ulClassName = "edit-button" + (showEdit ? "" : " hidden");

    return (
        <div className="mini-container">
            <h3>{props.location.name}</h3>
            <div className="mini-reviews"> {handleReviews()} {props?.reviews.length} Reviews</div>
            <div>Category: {props.location.category}</div>
            <div id="hours-edit">
            <div>Open: {props.location.operating_hours}</div>
            <div className={ulClassName}><button onClick={() => history.push(`/locations/${props.location.id}/edit`)}>Edit</button></div>
            </div>
        </div>
    )
}


export default MiniLocation
