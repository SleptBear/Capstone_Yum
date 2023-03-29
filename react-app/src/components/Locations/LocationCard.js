import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { getLocation } from "../../store/location";
import { readReviews } from "../../store/review";
import Stars from "../Reviews/Stars";
import './Card.css'

function LocationCard({location}) {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.review.LocationReviews)
    const reviewsArray = Object.values(reviews)
    useEffect(() => {
        // dispatch(getLocation(location?.id))
        dispatch(readReviews(location?.id))
    }, [dispatch])


    function getAvgRating(allReviews) {
        if(reviewsArray.length == 0) {
            return 0
            }
        let sum = 0
        let count = 0
        allReviews.forEach(review => {
            sum += review?.rating
            count += 1
        });
        let averageRating = Number(sum/count)
        console.log("calculated Average", Math.floor(averageRating))
        return Math.floor(averageRating)
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
                <Stars rating={getAvgRating(reviewsArray)}/> {reviewsArray.length}

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
