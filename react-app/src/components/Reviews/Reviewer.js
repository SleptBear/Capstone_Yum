

const Reviewer = (props) => {
    const rev = props.review
    return (
    <>
        <div>
            <img src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png" alt="prof pic"></img>
        </div>
        <div>
            <div>
                User: {rev.reviewer?.first_name} {rev.reviewer?.last_name}
            </div>
            <div>
                {rev.reviewer?.city}, {rev.reviewer?.state}
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


export default Reviewer
