const SplashReviewer = (props) => {
    const rev = props.review



    const handProfilePic = () => {
        if(rev.reviewer?.prof_pic === null) {
            return <img src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png" alt="prof pic"></img>
        } else {
            return <img src={rev.reviewer?.prof_pic} alt="prof pic"></img>
        }
    }
    return (
    <>
        <div>
            {handProfilePic()}
        </div>
        <div>
            <div>
                <h4>
                {rev.reviewer?.first_name} {rev.reviewer?.last_name}
                </h4>
            </div>
            {/* <div>
                wrote a review
            </div> */}
        </div>
    </>
    )
}


export default SplashReviewer
