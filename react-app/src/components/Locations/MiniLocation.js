

function MiniLocation(location) {
    console.log("prop", location?.location)
    if(!location?.location.id) return null
    return (
        <div className="mini-container">
            <div>{location.location.name}</div>
            <div>Reviews rating and amount</div>
            <div>Categories</div>
            <div>Open: {location.location.operating_hours}</div>
        </div>
    )
}


export default MiniLocation
