import React from "react";
import { useSelector } from "react-redux";
import './Card.css'

function LocationCard({location}) {

    console.log("prop", location)

    return (
        <div className="card-container">
            {/* <div className="image-container">
                <img src={spot.previewImage} alt='NOT FOUND'></img>
            </div> */}
            {/* <br></br> */}
        <div className="card-info">

            <div className="card-title">
                <h3>{location.city}, {location.state} </h3>
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
