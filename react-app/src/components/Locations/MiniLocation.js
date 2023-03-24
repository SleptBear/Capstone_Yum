import { NavLink } from "react-router-dom"


function MiniLocation(location) {
    console.log("prop", location?.location)
    if(!location?.location.id) return null
    return (
        <div className="mini-container">
            <div>{location.location.name}</div>
            <div>Reviews rating and amount</div>
            <div>Categories</div>
            <div>Open: {location.location.operating_hours}</div>
            <NavLink to={`/locations/${location.location.id}/edit`}>Edit</NavLink>
        </div>
    )
}


export default MiniLocation
