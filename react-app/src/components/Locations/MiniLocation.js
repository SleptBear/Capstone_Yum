import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"


function MiniLocation(location, reviews) {
    const history = useHistory()
    if(!location?.location.id || !reviews) return null
    console.log("prop", location?.location)
    console.log("propArray", reviews)
    return (
        <div className="mini-container">
            <h3>{location.location.name}</h3>
            <div>Reviews rating and amount<i class="fa-regular fa-star"></i>{reviews.length} # Reviews</div>
            <div>Category: {location.location.category}</div>
            <div>Open: {location.location.operating_hours} <button onClick={() => history.push(`/locations/${location.location.id}/edit`)}>Edit</button></div>
        </div>
    )
}


export default MiniLocation
