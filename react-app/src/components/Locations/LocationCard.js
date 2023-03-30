import React from "react";
import { useSelector } from "react-redux";
import { getLocation } from "../../store/location";
import { readReviews } from "../../store/review";
import Stars from "../Reviews/Stars";
import './Card.css'

function LocationCard({location}) {
    // const dispatch = useDispatch();
    const reviews = useSelector(state => state.review)
    // const reviewsArray = Object.values(reviews.LocationReviews)
    const reviewsArray = location.reviews

    console.log("location card props", location)
    // useEffect(() => {
    //     // dispatch(getLocation(location?.id))
    //     dispatch(readReviews(location?.id))
    // }, [dispatch])


    const handleReviews = () => {
        let avg = 0
        let count = 0
        reviewsArray.forEach(review => {
            avg += review?.rating
            count += 1
        });
        // console.log("BEFORE", averageRating)
        if(reviewsArray.length == 0) {
        return <Stars rating={0}/>
        }
        let averageRating = Number(avg/count)
        console.log("Average", averageRating)
        return <Stars rating={averageRating}/>
    }


    function getAvgRating(allReviews) {
        let sum = 0
        let count = 0
        if(reviewsArray.length == 0) {
            return 0
            }
        allReviews.forEach(review => {
            sum += review?.rating
            count += 1
        });
        let averageRating = Number(sum/count)
        console.log("calculated Average", Math.floor(averageRating))
        return <Stars rating={averageRating}/>
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    let randomRev = getRandomInt(reviewsArray.length)

    return (
        <div className="card-container">
            <div className="image-container">
                <img src={location.preview} alt='NOT FOUND'></img>
            </div>
            {/* <br></br> */}
        <div className="card-info">
            <div className="card-name">
                <h2>{location.id}. {location.name}</h2>
            </div>
            <div className="card-rating">
                <div>
                {handleReviews()}

                </div>
                <div id="numReview">
                {reviewsArray.length}

                </div>

            </div>
            <br></br>
            <div>
                {location?.category}
            </div>
            <br></br>
            <div>
                Hours: {location.operating_hours}
            </div>

            <div className="card-title">
                <h3>{location.city}, {location.state} </h3>
                <i className="fa-regular fa-comment"></i> {reviewsArray[randomRev]?.review}
                {/* <h3>{checkStar()} {checkAvg()}</h3> */}
            </div>
            <div>
            </div>
            {/* <br></br> */}
            <div className="card-body">
                {/* <div>$ {checkPrice()} night</div> */}
            </div>
        </div>
       </div>
    )
}

export default LocationCard
