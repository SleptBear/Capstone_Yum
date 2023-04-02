

const Reviewer = (props) => {
    const rev = props.review
    console.log(rev)
    let image = rev?.reviewer?.prof_pic

    if(image === null) image = "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"

    return (
    <>
        <div>
            <img src={image} alt="prof pic"></img>
        </div>
        <div>
            <div>
                User: {rev.reviewer?.first_name} {rev.reviewer?.last_name}
            </div>
            <div>
                {rev.reviewer?.city}, {rev.reviewer?.state}
            </div>
            <div id="add-ons">
                <i className="fa-regular fa-user"></i> 0
                <i className="fa-regular fa-star"></i> {rev.reviewer.num_reviews}
                <i className="fa-solid fa-camera"></i> {(rev.reviewer.images).length}
            </div>
        </div>
    </>
    )
}


export default Reviewer
