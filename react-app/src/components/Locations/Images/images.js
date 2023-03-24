


function AllImages(location) {
    console.log("prop", location?.location)
    if(!location?.location.id) return null
    return (
        <div className="mini-images">
            <button onClick={() => window.alert("Photo Modal Coming Soon")}>See all Photos</button>

        </div>
    )
}


export default AllImages
