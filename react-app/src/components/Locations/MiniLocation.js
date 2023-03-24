import { NavLink } from "react-router-dom"


function MiniLocation(location) {
    console.log("prop", location?.location)
    if(!location?.location.id) return null
    return (
        <div className="mini-container">
            <h3>{location.location.name}</h3>
            <div>Reviews rating and amount</div>
            <div>Category: {location.location.category}</div>
            <div>Open: {location.location.operating_hours}</div>
            <NavLink to={`/locations/${location.location.id}/edit`}>Edit</NavLink>
        </div>
    )
}


export default MiniLocation
