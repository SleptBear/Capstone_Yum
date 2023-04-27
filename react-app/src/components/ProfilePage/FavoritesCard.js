import React from "react"
import Stars from "../Reviews/Stars"

import { useDispatch } from "react-redux"


function FavoritesCard({location}) {
    const dispatch = useDispatch()
    console.log("location data", location)

    return (
        <div className="card-container" style={{width: '100%', height: '40%'}}>
            <div className="image-container">
                <img src={location.images[0].img_url} alt='Image Not Found' style={{height: '100%'}}></img>
            </div>
            {/* <br></br> */}
        <div className="card-info">
            <div className="card-name">
                <h2>{location.name}</h2>
            </div>
            {/* <div className="card-rating">
                <div>
                {handleReviews()}

                </div>
                <div id="numReview">
                {reviewsArray.length}

                </div>

            </div> */}
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
                {/* <div id="card-comment">
                    <div id="random-rev-logo">
                        <i className="fa-regular fa-comment"></i>
                    </div>
                    <div id="random-rev">
                        {reviewsArray[getRandomInt(reviewsArray.length)]?.review}
                    </div>
                </div> */}
            </div>
        </div>

       </div>
    )
}

export default FavoritesCard
