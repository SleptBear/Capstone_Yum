const RevLocation = (props) => {
    const rev = props.review
    // console.log("inside rev", rev)
    return (
    <>
        <div>
            <img src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png" alt="prof pic"></img>
        </div>
        <div>
            <div>
                {rev.location?.name}
            </div>
            <div>
                {rev.location?.city}, {rev.location?.state}
            </div>
            <div id="add-ons">
                <i className="fa-regular fa-user"></i> Friends
                <i className="fa-regular fa-star"></i> Reviews
                <i className="fa-solid fa-camera"></i> Photos
            </div>
        </div>
    </>
    )
}


export default RevLocation
