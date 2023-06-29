import React from "react"
import Stars from "../Reviews/Stars"

import { useDispatch } from "react-redux"


function FavoritesCard({location}) {
    const dispatch = useDispatch()
    // console.log("location data", location)

    return (
        <div className="card-container" style={{gap: '15px'}} >
            <div className="image-container" style={{alignItems: 'center'}}>
                <img src={location.images[0].img_url} alt='Image Not Found' style={{ maxHeight: '70%', minWidth: '100%', aspectRatio: '3/2', alignItems: 'center', marginLeft: '10px'}}></img>
            </div>
            {/* <br></br> */}
        <div className="card-info" style={{justifyContent: 'center'}}>
            <div className="card-name">
                <h2>{location.name}</h2>
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
