import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocation } from "../../store/location";
import { readReviews } from "../../store/review";
import Stars from "../Reviews/Stars";
import './Card.css'

// const dispatch = useDispatch();
// const reviews = useSelector(state => state.review)
// console.log('card reviews', reviews)
// const reviewsArray = Object.values(reviews.LocationReviews)

// useEffect(() => {
    //     dispatch(readReviews(location?.id))
    // }, [dispatch])

    // useEffect(() => {
    //     // dispatch(getLocation(location?.id))
    //     dispatch(readReviews(location?.id))
    // }, [dispatch])

    function LocationCard({location}) {
        const  dispatch = useDispatch();
        const reviewsArray = location?.reviews
        const sampReview = useRef(getRandomInt(reviewsArray?.length))
        // const stateReviews = useSelector(state => state.review)
        // const locationReviews = stateReviews?.LocationReviews
        // const stateRevArray = Object.values(locationReviews)
        // console.log("useEffect reviews", locationReviews)
        // console.log("useEffect reviews", stateRevArray)

         useEffect(() => {
        dispatch(readReviews(location?.id))
    }, [dispatch])

    // console.log("Location Card Render")
    // console.log("location Card Props", location)

    // if(!location?.reviews) return null
    // if(!locationReviews) return null
    // if(!stateRevArray[0]) return null
    // console.log("location card reviews", reviewsArray)



    const handleReviews = () => {
        let sum = 0
        // let count = 0
        let length = reviewsArray?.length
        // let length = stateRevArray?.length
        if(length === 0) {
        return <Stars rating={0}/>
        }
        reviewsArray.forEach(review => {
        // stateRevArray.forEach(review => {
            // console.log("Rating before sum", review?.rating)
            sum += review?.rating
            // count += 1
        });
        // console.log("arrayLength", length)
        let averageRating = Number(sum/length)
        // console.log("Average", averageRating)
        return <Stars rating={averageRating}/>
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    // let randomRev = getRandomInt(reviewsArray.length)
    // sampReview.current = randomRev
    //   console.log("location card render cycle")
      console.log("ref", sampReview)
    return (
        <div className="card-container">
            <div className="image-container">
                <img src={location.preview} alt='Image Not Found'></img>
            </div>
            {/* <br></br> */}
        <div className="card-info">
            <div className="card-name">
                <h2>{location.name}</h2>
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
            <div id="category">
                {location?.category}
            </div>
            <br></br>
            <div>
                Hours: {location.operating_hours}
            </div>

            <div className="card-title">
                <h3>{location.city}, {location.state} </h3>
                <div id="card-comment">
                    <div id="random-rev-logo">
                        <i className="fa-regular fa-comment"></i>
                    </div>
                    <div id="random-rev">
                        {/* {reviewsArray[getRandomInt(reviewsArray.length)]?.review} */}
                        {reviewsArray[sampReview.current]?.review}
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}

export default LocationCard
